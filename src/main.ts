import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { EnvService } from './shared/env/env.service';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/Http-error.filter';
import { setupSwagger } from './shared/utils/swagger.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({ driver: 'prisma' }));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  const configService = app.get<EnvService>(EnvService);
  const httpPort = configService.get('HTTP_PORT');

  await app.listen(httpPort, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 8000}`);
  });
}
bootstrap();
