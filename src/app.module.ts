import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobOffersModule } from './job-offers/job-offers.module';

@Module({
  imports: [
    JobOffersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
