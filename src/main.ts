import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));
  app.enableCors({
    origin: 'http://localhost:5173', // Cho phép frontend truy cập
    credentials: true, // Cho phép gửi cookies/token
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các headers được phép
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
