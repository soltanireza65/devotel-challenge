import { ListJobOffersQuery } from '@/job-offers/application/queries/list-job-offers/list-job-offers.query';
import { PaginationRequestDTO } from '@/shared/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ListJobOffersRequestDto extends PaginationRequestDTO {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  location?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  minSalary?: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  maxSalary?: number;

  toQuery() {
    const { take, page, ...rest } = this;
    const query = new ListJobOffersQuery(rest);

    query.page = this.page;
    query.take = this.take;

    return query;
  }
}
