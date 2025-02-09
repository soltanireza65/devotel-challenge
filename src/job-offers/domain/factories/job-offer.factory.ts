import { randomUUID } from 'crypto';
import { JobOfferModel, JobOfferModelArgs } from '../models/job-offer.model';

type JobOfferReadFactoryArgs = JobOfferModelArgs;

type JobOfferWriteFactoryArgs = Omit<JobOfferModelArgs, 'id'>;

export class JobOfferWriteFactory {
  static create(args: JobOfferWriteFactoryArgs): JobOfferModel {
    const id = randomUUID();

    return new JobOfferModel({
      id,
      ...args,
    });
  }
}

export class JobOfferReadFactory {
  static create(args: JobOfferReadFactoryArgs): JobOfferModel {
    return new JobOfferModel(args);
  }
}
