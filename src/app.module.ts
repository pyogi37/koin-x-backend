import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoModule } from './crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CryptoModule,
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB
    ScheduleModule.forRoot(),  // Import ScheduleModule to enable cron jobs
  ],
  controllers:[AppController],
  providers:[AppService]
})
export class AppModule {}
