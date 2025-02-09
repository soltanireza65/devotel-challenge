import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { SalaryRange } from '@/job-offers/domain/value-objects/salary-range';
import { ApiProperty } from '@nestjs/swagger';

export class JobOfferResponseDto {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public referenceId!: string;

  @ApiProperty()
  public title!: string;

  @ApiProperty()
  public location!: string;

  @ApiProperty()
  public company!: string;

  @ApiProperty()
  public salaryRange!: SalaryRange;

  @ApiProperty()
  public postedDate!: Date;

  static from(model: JobOfferModel): JobOfferResponseDto {
    return {
      id: model.id,
      referenceId: model.referenceId,
      title: model.title,
      location: model.location,
      company: model.company,
      salaryRange: model.salaryRange,
      postedDate: model.postedDate,
    };
  }
}
