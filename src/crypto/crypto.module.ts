import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { Crypto, CryptoSchema } from '../schemas/crypto.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crypto.name, schema: CryptoSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}
