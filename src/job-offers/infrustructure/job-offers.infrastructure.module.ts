import { DynamicModule, Module } from '@nestjs/common';
import { JobProviderPort } from '../application/ports/job-provider.port';
import { JobOfferProvider } from './providers/job-offer.provider';
import { JobOfferProviderAdapter1 } from './providers/adapters/job-offer-provider-1.adapter';
import { JobOfferProviderAdapter2 } from './providers/adapters/job-offer-provider-2.adapter';
import { IApplicationBootstrapOptions } from '@/shared/utils/utility.types';
import { JobOfferPrismaPersistenceModule } from './persistence/prisma/job-offer-prisma.module';

@Module({
  imports: [],
})
export class JobOffersInfrastructureModule {
  static use(options: IApplicationBootstrapOptions): DynamicModule {
    const persistenceModule = this.resolvePersistenceModule(options.driver);

    return {
      module: JobOffersInfrastructureModule,
      imports: [persistenceModule],
      providers: [
        JobOfferProviderAdapter1,
        JobOfferProviderAdapter2,
        {
          provide: JobProviderPort,
          useClass: JobOfferProvider,
        },
      ],
      exports: [persistenceModule, JobProviderPort],
    };
  }

  private static resolvePersistenceModule(driver: 'prisma' | 'typeorm') {
    switch (driver) {
      case 'typeorm':
        throw new Error('TypeORM not implemented yet');
      case 'prisma':
        return JobOfferPrismaPersistenceModule;
    }
  }
}
