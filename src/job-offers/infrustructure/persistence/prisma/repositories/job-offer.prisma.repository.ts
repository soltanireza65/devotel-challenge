import { Injectable } from '@nestjs/common';
import { JobOfferPrismaEntity } from '../entities/job-offer.entity';
import { JobOfferRepository, JobOfferWhereInput } from '@/job-offers/application/ports/job-offer-repository.port';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { JobOfferMapper } from '../mappers/job-offer.mapper';
import { FindAndPaginateOptions, FindOptions, Paginated } from '@/shared/utils/utility.types';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobOfferPrismaRepository implements JobOfferRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(data: JobOfferModel | JobOfferModel[]): Promise<JobOfferModel | JobOfferModel[]> {
    if (Array.isArray(data)) {
      const entityPromises: Promise<JobOfferPrismaEntity>[] = [];

      for (const model of data) {
        const mapped = JobOfferMapper.toPersistence(model);

        entityPromises.push(
          this.prismaService.jobOffer.upsert({
            create: { ...mapped },
            update: { ...mapped },
            where: {
              id: mapped.id,
            },
          }),
        );
      }

      const entities = await Promise.all(entityPromises);
      return entities.map((entity) => JobOfferMapper.toDomain(entity));
    }

    const mapped = JobOfferMapper.toPersistence(data);

    const entity = await this.prismaService.jobOffer.upsert({
      create: { ...mapped },
      update: { ...mapped },
      where: {
        id: mapped.id,
      },
    });
    return JobOfferMapper.toDomain(entity);
  }

  async findAll({ where, page, take }: FindAndPaginateOptions<JobOfferWhereInput>): Promise<Paginated<JobOfferModel>> {
    const whereClause: Prisma.JobOfferWhereInput = this.extractWhereClause(where);

    const entityList = await this.prismaService.jobOffer.findMany({
      where: whereClause,
      take: take,
      skip: (page - 1) * take,
    });

    const mapped = entityList?.map((entity) => {
      return JobOfferMapper.toDomain(entity);
    });

    const total = await this.count({ where: where });

    return {
      items: mapped,
      total: total,
    };
  }
  private extractWhereClause(where: Partial<JobOfferWhereInput> | undefined) {
    const whereClause: Prisma.JobOfferWhereInput = {};

    if (where?.title) {
      whereClause.title = { contains: where.title, mode: 'insensitive' };
    }

    if (where?.location) {
      whereClause.location = { contains: where.location, mode: 'insensitive' };
    }

    if (where?.minSalary) {
      whereClause.salaryRange = {
        path: ['min'],
        gte: where.minSalary,
      };
    }

    if (where?.maxSalary) {
      whereClause.salaryRange = {
        path: ['max'],
        lte: where.maxSalary,
      };
    }
    return whereClause;
  }

  count(options?: FindOptions<JobOfferWhereInput> | undefined): Promise<number> {
    const whereClause: Prisma.JobOfferWhereInput = this.extractWhereClause(options?.where);

    return this.prismaService.jobOffer.count({
      where: whereClause,
    });
  }
}
