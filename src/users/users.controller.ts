import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-users-dito';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id) {
    console.log(id, 'id');
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    const email = CreateUserDto?.email;
    const firstName = CreateUserDto?.firstName;
    const lastName = CreateUserDto?.lastName;
    const phoneNumber = CreateUserDto?.phoneNumber;
    const gender = CreateUserDto.gender;
    return this.usersService.createUser({
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    });
  }

  @Delete(':id')
  deleteUserById(@Param('id') id) {
    return this.usersService.delateUserById(Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(Number(id), updateUserDto);
  }
}
