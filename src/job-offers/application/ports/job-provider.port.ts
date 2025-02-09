import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';

export abstract class JobProviderPort {
  abstract fetch(): Promise<JobOfferModel[]>;
}
