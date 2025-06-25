import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users-dto';
import { UpdateUserDto } from './dto/update-users-dito';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async create({ email }: CreateUserDto) {
    const newUser = await this.userModel.create({ email });
    return newUser;
  }

  private users = [
    {
      id: 1,
      email: 'elg@gmail.com',
      firstName: 'elene',
      lastName: 'tchovelidze',
      phoneNumber: '598899948',
      gender: 'female',
      subscriptionStartDate: new Date(),
      subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
    {
      id: 2,
      email: 'rdddddag@gmail.com',
      firstName: 'eledddne',
      lastName: 'tchovdddelidze',
      phoneNumber: '598899948',
      gender: 'male',
       subscriptionStartDate: new Date(),
    subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  ];

  getAllUsers(
    page = 1,
    take = 30,
    filters?: { gender?: string; email?: string },
  ) {
    let result = [...this.users];

    const genderMap = {
      m: 'male',
      f: 'female',
    };

    if (filters?.gender) {
      const mappedGender =
        genderMap[filters.gender.toLowerCase()] ?? filters.gender.toLowerCase();
      result = result.filter(
        (user) => user.gender.toLowerCase() === mappedGender,
      );
    }

    if (filters?.email) {
      const emailFilter = filters.email.toLowerCase();
      result = result.filter((user) =>
        user.email.toLowerCase().startsWith(emailFilter),
      );
    }

    const start = (page - 1) * take;
    const end = start + take;

    return result.slice(start, end);
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


      const now = new Date();
const oneMonthLater = new Date();
oneMonthLater.setMonth(now.getMonth() + 1);


    const newUser = {
      id: lastId + 1,
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      subscriptionStartDate: now,
      subscriptionEndDate: oneMonthLater,
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
  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  @Post('upgrade-subscription')
  upgradeSubscription(email: string) {
    const user = this.findByEmail(email); // ← შეცვლილია ეს ხაზი
    if (!user) throw new NotFoundException('User not found');
  
    const currentEnd = new Date(user.subscriptionEndDate);
    currentEnd.setMonth(currentEnd.getMonth() + 1);
    user.subscriptionEndDate = currentEnd;
  
    return { message: 'Subscription upgraded', newEndDate: currentEnd };
  }
  
}
