import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-users-dito';
import { FilterUserDto } from './dto/FilterUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(
    @Query('page') page?: string,
    @Query('take') take?: string,
    @Query() filters: FilterUserDto = {},
  ) {
    const currentPage = page ? Number(page) : 1;
    const currentTake = take ? Number(take) : 30;

    return this.usersService.getAllUsers(currentPage, currentTake, filters);
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

  @Post('upgrade-subscription')
  upgradeSubscription(@Body('email') email: string) {
    return this.usersService.upgradeSubscription(email);
  }
}
