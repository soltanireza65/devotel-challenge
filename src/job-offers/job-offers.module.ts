import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { JobOffersFacade } from './application/facades/job-offers.facade';
import { JobOfferJob } from './application/jobs/pull-job-offers/pull-job-offers.job';
import { JobOfferJobProssesor } from './application/jobs/pull-job-offers/pull-job-offers.job-processor';
import { ListJobOffersQueryHandler } from './application/queries/list-job-offers/list-job-offers.query-handler';
import { JobOffersInfrastructureModule } from './infrustructure/job-offers.infrastructure.module';
import { JobOffersController } from './presenters/http/job-offers.controller';
import { IApplicationBootstrapOptions } from '@/shared/utils/utility.types';

@Module({
  imports: [
    //
    BullModule.registerQueue({ name: 'job-offer-queue' }),
  ],
  controllers: [
    //
    JobOffersController,
  ],
  providers: [
    //
    JobOffersFacade,
    JobOfferJob,
    JobOfferJobProssesor,
    ListJobOffersQueryHandler,
  ],
  exports: [],
})
export class JobOffersModule {
  static register(options: IApplicationBootstrapOptions) {
    return {
      module: JobOffersModule,
      imports: [JobOffersInfrastructureModule.use(options)],
    };
  }
}
