import { BadRequestException, Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

export class StandardDeviationResponseDto {
  deviation: number;
}

@Controller('stats')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  async getStats(@Query('coin') coin: string) {
    if (!coin) {
      throw new BadRequestException('Coin parameter is required');
    }
    const data = await this.cryptoService.fetchCryptoData([coin]);
    if (!data[coin]) {
      throw new NotFoundException(`No data found for coin: ${coin}`);
    }
    return {
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    };
  }

  @Get('deviation')
  async getStandardDeviation(
    @Query('coin') coin: string,
  ): Promise<StandardDeviationResponseDto> {
    if (!coin) {
      throw new BadRequestException('Coin parameter is required');
    }
    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
      throw new BadRequestException('Invalid coin');
    }
    const deviation = await this.cryptoService.getPriceStandardDeviation(coin);
    if (!deviation) {
      throw new NotFoundException(`No data found for coin: ${coin}`);
    }
    return { deviation };
  }
}
