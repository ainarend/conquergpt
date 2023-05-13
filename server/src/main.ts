import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelistOrigins = process.env.ALLOWED_CORS_ORIGIN;
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelistOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    optionsSuccessStatus: 200,
  });
  await app.listen(3000);
}
bootstrap();
