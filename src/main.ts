import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  process.env.TZ = 'America/Sao_Paulo';
  
  app.enableCors();
  
  app.useGlobalPipes();

  await app.listen(process.env.PORT ?? 3080);
}
bootstrap();
