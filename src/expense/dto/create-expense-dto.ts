import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';

export const knownCategories = [
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
];

export class CreateExpenseDto {
  @IsIn(knownCategories)
  category: string;
  @IsNotEmpty()
  productName: string;
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  quantity: number;
  @IsNumber()
  @Min(0.1)
  @Transform(({ value }) => Number(value))
  price: number;
}
