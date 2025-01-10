import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crypto, CryptoDocument } from '../schemas/crypto.schema';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);
  private readonly apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

  constructor(
    @InjectModel(Crypto.name) private cryptoModel: Model<CryptoDocument>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchAndStoreCryptoData() {
    try {
      this.logger.log('Fetching cryptocurrency data...');
      const coins = ['bitcoin', 'matic-network', 'ethereum'];
      const data = await this.fetchCryptoData(coins);
      await this.storeCryptoData(coins, data);
    } catch (error) {
      this.logger.error('Error fetching cryptocurrency data', error.stack);
    }
  }

  private async fetchCryptoData(coins: string[]): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          ids: coins.join(','),
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`Axios error: ${error.message}`);
        throw new Error(`Failed to fetch data for coins: ${coins.join(', ')}`);
      } else {
        this.logger.error(`Unexpected error: ${error.message}`);
        throw new Error('An unexpected error occurred while fetching cryptocurrency data.');
      }
    }
  }

  private async storeCryptoData(coins: string[], data: any): Promise<void> {
    for (const coin of coins) {
      const record = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      };
      await this.cryptoModel.create(record);
      this.logger.log(`Saved data for ${coin}: ${JSON.stringify(record)}`);
    }
  }
}
