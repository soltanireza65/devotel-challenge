import { WithPagination } from '@/shared/utils/utility.types';

export class ListJobOffersQuery extends WithPagination {
  constructor(
    public query: {
      title?: string;
      location?: string;
      minSalary?: number;
      maxSalary?: number;
    },
  ) {
    super();
  }
}
