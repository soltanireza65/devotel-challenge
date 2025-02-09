export class Paginated<T> {
  items!: T[];
  total!: number;
}

export class WithPagination {
  take!: number;
  page!: number;
}

export class FindOptions<TWhereInput> {
  where?: Partial<TWhereInput>;
}

export class FindAndPaginateOptions<TWhereInput> extends WithPagination {
  where?: Partial<TWhereInput>;
}

export type IApplicationBootstrapOptions = { driver: 'prisma' | 'typeorm' };
