import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { JobOfferRepository } from '../../ports/job-offer-repository.port';
import { JobProviderPort } from '../../ports/job-provider.port';

@Processor('job-offer-queue')
export class JobOfferJobProssesor extends WorkerHost {
  private readonly logger = new Logger(JobOfferJobProssesor.name);

  constructor(
    private readonly jobOfferRepository: JobOfferRepository,
    private readonly jobProviderPort: JobProviderPort,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'fetch-job-offers':
        this.logger.log('Fetching job offers...');
        const jobOffers = await this.jobProviderPort.fetch();
        await this.jobOfferRepository.save(jobOffers);
        this.logger.log(`Saved ${jobOffers.length} job offers.`);
        break;

      default:
        break;
    }
  }
}
