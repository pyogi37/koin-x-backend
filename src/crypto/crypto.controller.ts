import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('stats')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  async getStats(@Query('coin') coin: string) {
    if (!coin) {
      throw new Error('Coin parameter is required');
    }
    const data = await this.cryptoService.fetchCryptoData([coin]);
    if(!data[coin]) {
        throw new NotFoundException(`No data found for coin: ${coin}`);
    }
    return {
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    };
  }
}
