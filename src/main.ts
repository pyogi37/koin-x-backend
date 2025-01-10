import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // Allow all origins
    credentials: true,
  });
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, ()=>{
    console.log(
      `\x1b[1m\x1b[32m>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HAZO SERVER ON PORT \x1b[33m${process.env.PORT}\x1b[32m <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\x1b[0m`,
    );
  });

}

bootstrap();
