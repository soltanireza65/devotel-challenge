import { JobOffersModule } from '@/job-offers/job-offers.module';
import { envSchema } from '@/shared/env/env';
import { EnvModule } from '@/shared/env/env.module';
import { BullModule } from '@nestjs/bullmq';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { QueueOptions } from 'bullmq';
import { WinstonModule } from 'nest-winston';
import { EnvService } from './shared/env/env.service';
import { winstonLoggerConfig } from './shared/config/logger.config';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';
import { IApplicationBootstrapOptions } from './shared/utils/utility.types';
import { PrismaModule } from './shared/prisma/prisma.module';
import { CoreModule } from './shared/core/core.module';

@Module({
  imports: [
    PrismaModule,
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
      envFilePath: '.env',
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (envService: EnvService): QueueOptions => {
        return {
          connection: {
            host: envService.getOrThrow('REDIS_HOST'),
            port: envService.getOrThrow('REDIS_PORT'),
            password: envService.getOrThrow('REDIS_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
    WinstonModule.forRoot({
      transports: winstonLoggerConfig,
    }),
    EnvModule,
    JobOffersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }

  static register(options: IApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        //
        CoreModule.forRoot(options),
        JobOffersModule.register(options),
      ],
    };
  }
}
