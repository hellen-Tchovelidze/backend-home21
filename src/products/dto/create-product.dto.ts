import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    category: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;
  }
  