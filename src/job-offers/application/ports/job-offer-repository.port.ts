import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { FindAndPaginateOptions, FindOptions, Paginated } from '@/shared/utils/utility.types';

export type JobOfferWhereInput = {
  title?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
};

export abstract class JobOfferRepository {
  abstract save(alarm: JobOfferModel | JobOfferModel[]): Promise<JobOfferModel | JobOfferModel[]>;
  abstract findAll(options: FindAndPaginateOptions<JobOfferWhereInput>): Promise<Paginated<JobOfferModel>>;
  abstract count(options?: FindOptions<JobOfferWhereInput> | undefined): Promise<number>;
}
