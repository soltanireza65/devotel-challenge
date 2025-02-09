import { JobOffersFacade } from '@/job-offers/application/facades/job-offers.facade';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListJobOffersRequestDto } from './dto/request/list-job-offers-request.dto';
import { ListJobOffersResponseDto } from './dto/response/list-job-offers-response.dto';

@ApiTags('job-offers')
@Controller('job-offers')
export class JobOffersController {
  constructor(private readonly jobOffersFacade: JobOffersFacade) {}

  @Get()
  async findAll(@Query() dto: ListJobOffersRequestDto): Promise<ListJobOffersResponseDto> {
    const res = await this.jobOffersFacade.findAll(dto.toQuery());
    const mapped = ListJobOffersResponseDto.from(res);
    return mapped;
  }
}
