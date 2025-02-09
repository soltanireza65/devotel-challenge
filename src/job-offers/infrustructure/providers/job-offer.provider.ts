import { JobProviderPort } from '@/job-offers/application/ports/job-provider.port';
import { JobOfferProviderAdapter1 } from './adapters/job-offer-provider-1.adapter';
import { Injectable } from '@nestjs/common';
import { JobOfferProviderAdapter2 } from './adapters/job-offer-provider-2.adapter';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';

@Injectable()
export class JobOfferProvider implements JobProviderPort {
  private adapters: (JobOfferProviderAdapter1 | JobOfferProviderAdapter2)[] = [];

  constructor(jobOfferProviderAdapter1: JobOfferProviderAdapter1, jobOfferProviderAdapter2: JobOfferProviderAdapter2) {
    this.adapters = [jobOfferProviderAdapter1, jobOfferProviderAdapter2];
  }

  async fetch(): Promise<JobOfferModel[]> {
    const list: JobOfferModel[] = [];

    for (const adapter of this.adapters) {
      const jobOffers = await adapter.fetch();
      list.push(...jobOffers);
    }

    return list;
  }
}
