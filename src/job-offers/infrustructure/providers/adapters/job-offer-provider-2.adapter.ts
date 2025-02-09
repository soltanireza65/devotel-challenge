import { JobOfferWriteFactory } from '@/job-offers/domain/factories/job-offer.factory';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import axios from 'axios';
import { AbstractJobOfferProviderAdapter } from './abstract-job-offer-provider.adapter';
import { Logger } from '@nestjs/common';

interface TResponse {
  status: string;
  data: Data;
}

interface Data {
  jobsList: JobsList;
}

interface JobsList {
  'job-937': Job;
  'job-990': Job;
}

interface Job {
  position: string;
  location: Location;
  compensation: Compensation;
  employer: Employer;
  requirements: Requirements;
  datePosted: Date;
}

interface Compensation {
  min: number;
  max: number;
  currency: string;
}

interface Employer {
  companyName: string;
  website: string;
}

interface Location {
  city: string;
  state: string;
  remote: boolean;
}

interface Requirements {
  experience: number;
  technologies: string[];
}

export class JobOfferProviderAdapter2 extends AbstractJobOfferProviderAdapter {
  readonly logger = new Logger(JobOfferProviderAdapter2.name);
  static key = 'provider-2';

  private readonly baseUrl = 'https://assignment.devotel.io';
  private readonly requestUrl = 'api/provider2/jobs';

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
        const mapped = this.map(data.data.jobsList);
        return mapped;
      } else {
        this.logger.warn('No jobs found or non-retryable error occurred.');
      }
    } catch (error) {
      this.logger.error('Job fetching completely failed:', error);
    }

    return [];
  }

  private map(jobsList: JobsList): JobOfferModel[] {
    return Object.entries(jobsList).map(([id, job]: [string, Job]) => {
      const isRemote = job.location.remote;
      return JobOfferWriteFactory.create({
        title: job.position,
        referenceId: id,
        location: this.mapJobLocation(job.location),
        company: job.employer.companyName,
        postedDate: job.datePosted,
        salaryRange: job.compensation,
        provider: JobOfferProviderAdapter2.key,
      });
    });
  }

  private mapJobLocation(location: Location) {
    const isRemote = location.remote;

    if (isRemote) {
      return `${location.city}, ${location.state} (Remote)`;
    }

    return `${location.state} - ${location.city}`;
  }
}
