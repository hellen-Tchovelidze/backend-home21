import { IsIn, IsOptional, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { knownCategories } from './create-expense-dto';

export class UpdateExpenseDto {
  @IsOptional()
  @IsIn(knownCategories)
  category?: string;
  @IsOptional()
  productName?: string;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  quantity?: number;
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Transform(({ value }) => Number(value))
  price?: number;
  totalPrice?: number;
}
