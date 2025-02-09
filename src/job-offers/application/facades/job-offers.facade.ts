import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ListJobOffersQuery } from '../queries/list-job-offers/list-job-offers.query';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { Paginated } from '@/shared/utils/utility.types';

@Injectable()
export class JobOffersFacade {
  constructor(private readonly queryBus: QueryBus) {}

  findAll(query: ListJobOffersQuery): Promise<Paginated<JobOfferModel>> {
    return this.queryBus.execute(query);
  }
}
