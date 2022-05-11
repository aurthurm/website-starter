import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
// import getLogLevels from './utils/log-levels';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log', 'verbose', 'debug'], // getLogLevels(process.env.NODE_ENV === 'production'),
  });
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('NMRL WEBSITE API')
    .setDescription('The api for nmrl website')
    .setVersion('1.0')
    .addTag('nmrl_v1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(
    process.env.BACKEND_SERVER_PORT || 3000,
    process.env.BACKEND_SERVER_HOST || '0.0.0.0',
  );
}
bootstrap();
