import { JobOfferWriteFactory } from '@/job-offers/domain/factories/job-offer.factory';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { AbstractJobOfferProviderAdapter } from './abstract-job-offer-provider.adapter';

interface TResponse {
  metadata: Metadata;
  jobs: Job[];
}

interface Job {
  jobId: string;
  title: string;
  details: Details;
  company: Company;
  skills: string[];
  postedDate: Date;
}

interface Company {
  name: string;
  industry: string;
}

interface Details {
  location: string;
  type: string;
  salaryRange: string;
}

interface Metadata {
  requestId: string;
  timestamp: Date;
}

export class JobOfferProviderAdapter1 extends AbstractJobOfferProviderAdapter {
  readonly logger = new Logger(JobOfferProviderAdapter1.name);

  static key = 'provider-1';

  private readonly baseUrl = 'https://assignment.devotel.io';
  private readonly requestUrl = 'api/provider1/jobs';

  async fetch(): Promise<JobOfferModel[]> {
    const fetchFn = () => {
      return axios.request<TResponse>({
        method: 'get',
        baseURL: this.baseUrl,
        url: this.requestUrl,
      });
    };

    try {
      const data = await this.fetchWithRetry({
        fetchFn: fetchFn,
        delay: 5000,
        maxRetries: 3,
      });

      if (data) {
        const mapped = this.map(data.jobs);
        return mapped;
      } else {
        this.logger.warn('No jobs found or non-retryable error occurred.');
      }
    } catch (error) {
      this.logger.error('Job fetching completely failed:', error);
    }

    return [];
  }

  map(jobs: Job[]): JobOfferModel[] {
    return jobs.map((job) => {
      const model = JobOfferWriteFactory.create({
        title: job.title,
        referenceId: job.jobId,
        location: job.details.location,
        company: job.company.name,
        postedDate: job.postedDate,
        salaryRange: this.parseSalaryRange(job.details.salaryRange),
        provider: JobOfferProviderAdapter1.key,
      });

      return model;
    });
  }

  // It sould be a private methid, i'd just marked it as public to write unit tests for it, (i know there is some workarounds to write unit tests for private members)
  parseSalaryRange(salaryRange: string) {
    const currencyMap: Record<string, string> = { $: 'USD', '€': 'EUR', '£': 'GBP' };

    const currencySymbol = salaryRange.match(/[$€£]/)?.[0] || '$';
    const currency = currencyMap[currencySymbol] || 'UNKNOWN';

    const [min, max] = salaryRange
      .replace(new RegExp(`\\${currencySymbol}|k`, 'g'), '')
      .split('-')
      .map((num) => parseInt(num.trim(), 10) * 1000);

    return { min, max, currency };
  }
}
