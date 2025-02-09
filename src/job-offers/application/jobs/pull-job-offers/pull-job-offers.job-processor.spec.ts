import { Test, TestingModule } from '@nestjs/testing';
import { JobOfferJobProssesor } from './pull-job-offers.job-processor';
import { JobOfferRepository } from '../../ports/job-offer-repository.port';
import { JobProviderPort } from '../../ports/job-provider.port';
import { Job } from 'bullmq';

const mockJobOffer = {
  id: '001d92a8-7ca8-4f58-b104-cb5fec76ab56',
  referenceId: 'P1-273',
  title: 'Data Scientist',
  location: 'New York, NY',
  company: 'TechCorp',
  salaryRange: {
    max: 130000,
    min: 62000,
    currency: 'USD',
  },
  postedDate: new Date('2021-09-01T00:00:00.000Z'),
  createdAt: new Date('2021-09-01T00:00:00.000Z'),
  updatedAt: new Date('2021-09-01T00:00:00.000Z'),
  provider: 'provider-1',
};

const mockJobOffers = [mockJobOffer];

describe('JobOfferJobProssesor', () => {
  let jobOfferJobProssesor: JobOfferJobProssesor;
  let jobOfferRepository: JobOfferRepository;
  let jobProviderPort: JobProviderPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobOfferJobProssesor,
        {
          provide: JobOfferRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: JobProviderPort,
          useValue: {
            fetch: jest.fn(),
          },
        },
      ],
    }).compile();

    jobOfferJobProssesor = module.get<JobOfferJobProssesor>(JobOfferJobProssesor);
    jobOfferRepository = module.get<JobOfferRepository>(JobOfferRepository);
    jobProviderPort = module.get<JobProviderPort>(JobProviderPort);
  });

  it('should be defined', () => {
    expect(jobOfferJobProssesor).toBeDefined();
  });

  describe('process', () => {
    it('should fetch job offers when job name is fetch-job-offers', async () => {
      const job: Job = { name: 'fetch-job-offers' } as any;

      jest.spyOn(jobProviderPort, 'fetch').mockResolvedValue(mockJobOffers);
      jest.spyOn(jobOfferRepository, 'save').mockResolvedValue(mockJobOffer);

      await jobOfferJobProssesor.process(job);

      expect(jobProviderPort.fetch).toHaveBeenCalledTimes(1);
      expect(jobOfferRepository.save).toHaveBeenCalledTimes(1);
      expect(jobOfferRepository.save).toHaveBeenCalledWith(mockJobOffers);
    });

    it('should not fetch job offers when job name is not fetch-job-offers', async () => {
      const job: Job = { name: 'other-job' } as any;

      await jobOfferJobProssesor.process(job);

      expect(jobProviderPort.fetch).not.toHaveBeenCalled();
      expect(jobOfferRepository.save).not.toHaveBeenCalled();
    });
  });
});
