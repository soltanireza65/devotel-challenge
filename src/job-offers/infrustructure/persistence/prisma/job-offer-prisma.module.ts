import { Module } from '@nestjs/common';
import { JobOfferPrismaRepository } from './repositories/job-offer.prisma.repository';
import { JobOfferRepository } from '@/job-offers/application/ports/job-offer-repository.port';

@Module({
  imports: [],
  providers: [
    {
      provide: JobOfferRepository,
      useClass: JobOfferPrismaRepository,
    },
  ],
  exports: [JobOfferRepository],
})
export class JobOfferPrismaPersistenceModule {}
