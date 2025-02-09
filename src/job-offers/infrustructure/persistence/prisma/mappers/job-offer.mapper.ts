import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { JobOfferPrismaEntity } from '../entities/job-offer.entity';
import { JobOfferReadFactory } from '@/job-offers/domain/factories/job-offer.factory';
import { Prisma } from '@prisma/client';

export class JobOfferMapper {
  static toDomain(entity: JobOfferPrismaEntity) {
    const { id, referenceId, title, company, location, postedDate, salaryRange, provider, createdAt, updatedAt } =
      entity;
    const alarmModel = JobOfferReadFactory.create({
      id,
      referenceId,
      title,
      company,
      location,
      postedDate,
      salaryRange: salaryRange as any,
      provider,
      createdAt,
      updatedAt,
    });

    return alarmModel;
  }

  static toPersistence(model: JobOfferModel): Prisma.JobOfferCreateInput {
    const { id, referenceId, title, company, location, postedDate, salaryRange, provider, createdAt, updatedAt } =
      model;

    return {
      id,
      referenceId,
      title,
      company,
      location,
      postedDate,
      salaryRange: salaryRange as any,
      provider,
      createdAt,
      updatedAt,
    };
  }
}
