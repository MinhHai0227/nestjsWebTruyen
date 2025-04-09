import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*', // Cho phép tất cả các nguồn
    credentials: true, // Cho phép gửi cookies/token
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'], // Cho phép các phương thức khác nhau
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ], // Các header cho phép
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
