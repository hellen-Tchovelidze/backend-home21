import { IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsIn(['m', 'f']) 
  gender: string;
}


