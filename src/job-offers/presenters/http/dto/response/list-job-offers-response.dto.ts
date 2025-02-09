import { Paginated } from '@/shared/utils/utility.types';
import { JobOfferModel } from '@/job-offers/domain/models/job-offer.model';
import { ApiProperty } from '@nestjs/swagger';
import { JobOfferResponseDto } from './job-offers-response.dto';

export class ListJobOffersResponseDto {
  @ApiProperty()
  items!: JobOfferResponseDto[];
  @ApiProperty()
  total!: number;

  static from(res: Paginated<JobOfferModel>): ListJobOffersResponseDto {
    return {
      items: res.items.map((r) => JobOfferResponseDto.from(r)),
      total: res.items.length,
    };
  }
}
