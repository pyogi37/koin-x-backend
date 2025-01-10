import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [
    CryptoModule,
    ScheduleModule.forRoot(),  // Import ScheduleModule to enable cron jobs
  ],
})
export class AppModule {}
