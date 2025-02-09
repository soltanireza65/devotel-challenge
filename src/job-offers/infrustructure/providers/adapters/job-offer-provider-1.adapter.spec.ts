import { JobOfferProviderAdapter1 } from './job-offer-provider-1.adapter';

jest.mock('axios', () => ({
  request: jest.fn(),
}));

describe('JobOfferProviderAdapter1', () => {
  let adapter: JobOfferProviderAdapter1;

  beforeEach(() => {
    adapter = new JobOfferProviderAdapter1();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('parseSalaryRange', () => {
    it('should correctly parse salary range with currency symbol', () => {
      const result = adapter.parseSalaryRange('$50k-$70k');
      expect(result).toEqual({ min: 50000, max: 70000, currency: 'USD' });
    });

    it('should handle missing currency symbol and default to USD', () => {
      const result = adapter.parseSalaryRange('50k-70k');
      expect(result).toEqual({ min: 50000, max: 70000, currency: 'USD' });
    });

    it('should handle euro and pound currencies', () => {
      const result = adapter.parseSalaryRange('€40k-60k');
      expect(result).toEqual({ min: 40000, max: 60000, currency: 'EUR' });

      const resultPound = adapter.parseSalaryRange('£40k-60k');
      expect(resultPound).toEqual({ min: 40000, max: 60000, currency: 'GBP' });
    });

    it('should handle salary ranges with "k" suffix', () => {
      const result = adapter.parseSalaryRange('€40k-60k');
      expect(result).toEqual({ min: 40000, max: 60000, currency: 'EUR' });
    });
  });
});

describe('JobOfferProviderAdapter1', () => {
  let adapter: JobOfferProviderAdapter1;

  beforeEach(() => {
    adapter = new JobOfferProviderAdapter1();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should map a single job to a JobOfferModel', () => {
    const job = {
      title: 'Software Engineer',
      jobId: '123',
      details: {
        location: 'New York',
        salaryRange: '$100,000 - $150,000',
        type: 'Full-time',
      },
      company: {
        name: 'ABC Corp',
        industry: 'Tech',
      },
      skills: [],
      postedDate: new Date(),
    };

    const result = adapter.map([job]);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe(job.title);
    expect(result[0].referenceId).toBe(job.jobId);
    expect(result[0].location).toBe(job.details.location);
    expect(result[0].company).toBe(job.company.name);
    expect(result[0].postedDate).toBe(job.postedDate);
    expect(result[0].salaryRange).toBeDefined();
    expect(result[0].provider).toBe(JobOfferProviderAdapter1.key);
  });

  it('should map multiple jobs to JobOfferModels', () => {
    const jobs = [
      {
        title: 'Software Engineer',
        jobId: '123',
        details: {
          location: 'New York',
          salaryRange: '$100,000 - $150,000',
          type: 'Full-time',
        },
        company: {
          name: 'ABC Corp',
          industry: 'Tech',
        },
        skills: [],
        postedDate: new Date(),
      },
      {
        title: 'Software Developer',
        jobId: '321',
        details: {
          location: 'New York',
          salaryRange: '$110,000 - $150,000',
          type: 'Full-time',
        },
        company: {
          name: 'ABC Corp',
          industry: 'Tech',
        },
        skills: [],
        postedDate: new Date(),
      },
    ];

    const result = adapter.map(jobs);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe(jobs[0].title);
    expect(result[1].title).toBe(jobs[1].title);
  });
});
