import { IsEmail, IsIn, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;
  @IsOptional()
  lastName?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  @IsIn(['m', 'f'])
  gender?: string;
}



