import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  @IsIn(['m', 'f'])
  gender?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
