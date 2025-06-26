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
import { UsersModule } from './users.module';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async create({ email }: CreateUserDto) {
    const newUser = await this.userModel.create({ email });
    return newUser;
  }

  // private users = [
  //   {
  //     id: 1,
  //     email: 'elg@gmail.com',
  //     firstName: 'elene',
  //     lastName: 'tchovelidze',
  //     phoneNumber: '598899948',
  //     gender: 'female',
  //     subscriptionStartDate: new Date(),
  //     subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  //   },
  //   {
  //     id: 2,
  //     email: 'rdddddag@gmail.com',
  //     firstName: 'eledddne',
  //     lastName: 'tchovdddelidze',
  //     phoneNumber: '598899948',
  //     gender: 'male',
  //      subscriptionStartDate: new Date(),
  //   subscriptionEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  //   },
  // ];

  async getAllUsers(
    page = 1,
    take = 30,
    filters?: { gender?: string; email?: string },
  ) {
   const query: any = {}

    const genderMap = {
      m: 'male',
      f: 'female',
    };

    if (filters?.gender) {
      query.gender =
        genderMap[filters.gender.toLowerCase()] ?? filters.gender.toLowerCase();
    }

    if (filters?.email) {
      query.email = { $regex: `^${filters.email}`, $options: 'i' }; // case-insensitive startsWith
    }
  
    const skip = (page - 1) * take;

    const result = await this.userModel.find(query).skip(skip).limit(take).exec();

    return result;
  }

  getUserById(id: number) {
    const user = this.userModel.find((el) => el.id === id);
    return user;
  }

 async createUser({
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

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

      const now = new Date();
const oneMonthLater = new Date();
oneMonthLater.setMonth(now.getMonth() + 1);



    const newUser =await this.userModel.create( {
     
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      subscriptionStartDate: now,
      subscriptionEndDate: oneMonthLater,
     
    })
    

    return newUser;
  }

  delateUserById(id: number) {
    const index = this.userModel.findById(id);
    if (!index) throw new BadRequestException('User not found');

    this.userModel.findByIdAndDelete(id);

    return 'User deleted successfully';
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const index = this.userModel.findByIdAndUpdate(id);
    if (!index) throw new BadRequestException('User not found');

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
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateReq, {
      new: true,
    });
  
    return updatedUser;
  }

  
  findByEmail(email: string) {
    return this.userModel.find((user) => user.email === email);
  }



  async upgradeSubscription(email: string) {
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const currentEnd = new Date(user.subscriptionEndDate || new Date());
    currentEnd.setMonth(currentEnd.getMonth() + 1);
  
    await this.userModel.updateOne(
      { email },
      { $set: { subscriptionEndDate: currentEnd } }
    );
  
    return {
      message: 'Subscription upgraded',
      newEndDate: currentEnd,
    };
  }
  
}
