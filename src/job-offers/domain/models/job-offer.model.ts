import { SalaryRange } from '../value-objects/salary-range';

export type JobOfferModelArgs = {
  readonly id: string;
  referenceId: string;
  title: string;
  location: string;
  company: string;
  salaryRange: SalaryRange;
  postedDate: Date;
  provider: string;
  createdAt?: Date;
  updatedAt?: Date | null;
};

export class JobOfferModel {
  public id: string;
  public referenceId: string;
  public title: string;
  public location: string;
  public company: string;
  public salaryRange: SalaryRange;
  public postedDate: Date;
  public provider: string;
  public createdAt: Date;
  public updatedAt: Date | null;

  constructor(args: JobOfferModelArgs) {
    this.id = args.id;
    this.referenceId = args.referenceId;
    this.title = args.title;
    this.location = args.location;
    this.company = args.company;
    this.salaryRange = args.salaryRange;
    this.postedDate = args.postedDate;
    this.provider = args.provider;
    this.createdAt = args.createdAt ?? new Date();
    this.updatedAt = args.updatedAt ?? new Date();
  }
}
