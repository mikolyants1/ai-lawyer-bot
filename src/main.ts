import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const PORT = config.get<number>('PORT') ?? 5001;
  await app.listen(PORT, () => {
    Logger.log(`server runs on ${PORT}`);
  });
}
bootstrap();
