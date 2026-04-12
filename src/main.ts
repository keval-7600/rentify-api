import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  // app.enableCors({
  //   origin: corsOrigins,
  //   credentials: true,
  // });

  // Set global prefix
  app.setGlobalPrefix('/api');

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Start server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
