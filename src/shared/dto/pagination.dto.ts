import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class PaginationRequestDTO {
  @ApiProperty({
    example: 1,
  })
  @IsPositive()
  @IsNotEmpty()
  public readonly page: number;

  @ApiProperty({
    example: 10,
  })
  @IsPositive()
  @IsNotEmpty()
  public readonly take: number;

  constructor(page: number, take: number) {
    this.page = page;
    this.take = take;
  }
}
