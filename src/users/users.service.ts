import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-dto';
import { UpdateUserDto } from './dto/update-users-dito';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      email: 'rag@gmail.com',
      firstName: 'elene',
      lastName: 'tchovelidze',
      phoneNumber: '598899948',
      gender: 'no',
    },
    {
      id: 2,
      email: 'rdddddag@gmail.com',
      firstName: 'eledddne',
      lastName: 'tchovdddelidze',
      phoneNumber: '598899948',
      gender: 'no',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((el) => el.id === id);
    return user;
  }

  createUser({
    email,
    firstName,
    lastName,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    if (!email || !firstName || !lastName || !phoneNumber || !gender) {
      throw new HttpException(
        'name and email are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lastId = this.users.length
      ? this.users[this.users.length - 1]?.id
      : 0;

    const newUser = {
      id: lastId + 1,
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);

    return 'created successfully';
  }

  delateUserById(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('User not found');

    this.users.splice(index, 1);

    return 'User deleted successfully';
  }

  updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('User not found');

    const updateReq: UpdateUserDto = {};
    if (updateUserDto.email) {
      updateReq.email = updateUserDto.email;
    }

    if (updateUserDto.firstName) {
      updateReq.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      updateReq.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.phoneNumber) {
      updateReq.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.gender) {
      updateReq.gender = updateUserDto.gender;
    }

    this.users[index] = {
      ...this.users[index],
      ...updateReq,
    };

    return 'User update successfully';
  }
}
