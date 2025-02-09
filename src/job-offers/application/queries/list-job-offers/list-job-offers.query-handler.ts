import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListJobOffersQuery } from './list-job-offers.query';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { JobOfferRepository } from '../../ports/job-offer-repository.port';
import { Paginated } from '@/shared/utils/utility.types';

@QueryHandler(ListJobOffersQuery)
export class ListJobOffersQueryHandler implements IQueryHandler<ListJobOffersQuery, Paginated<JobOfferModel>> {
  constructor(private readonly jobOfferRepositoryPort: JobOfferRepository) {}

  execute({ query, page, take }: ListJobOffersQuery): Promise<Paginated<JobOfferModel>> {
    return this.jobOfferRepositoryPort.findAll({
      where: query,
      page,
      take,
    });
  }
}
