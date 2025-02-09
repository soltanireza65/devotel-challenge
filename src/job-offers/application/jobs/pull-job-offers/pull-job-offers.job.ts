import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class JobOfferJob implements OnModuleInit {
  constructor(
    @InjectQueue('job-offer-queue') private readonly queue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const JOB_OFFER_CRON_SCHEDULE = this.configService.get<string>('JOB_OFFER_CRON_SCHEDULE', '*/10 * * * * *');
    this.queue.add('fetch-job-offers', {}, { repeat: { pattern: JOB_OFFER_CRON_SCHEDULE } });
  }
}
