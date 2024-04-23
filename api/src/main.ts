import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Remove automaticamente as propriedades não definidas na DTO
        forbidNonWhitelisted: true, // Lança um erro se houver propriedades não definidas na DTO
        transform: true, // Transforma os dados recebidos em instâncias da DTO
      }),
  );
  app.enableCors({
      origin: 'http://localhost:8080',
  });
  await app.listen(3000);
}
bootstrap();
