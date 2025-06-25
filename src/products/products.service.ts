import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductsService {
 
  constructor(
    @InjectModel(Product.name) private readonly prodactModel: Model<Product>,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}


  async create({name, quantity, description,category, price  }: CreateProductDto, userId: string) {
    const existUser = await this.userModel.findById(userId);
    if (!existUser) {
      throw new Error('User not found');
    }
    const newProducts = await this.prodactModel.create({
      name,
      quantity,
      description,
      category,
      price,
      author: existUser._id,
    });
    await this.userModel.findByIdAndUpdate(existUser._id, {
      $push: { products: newProducts._id },
    });
    
    return { sucsess: 'ok', data: newProducts };
  }
  findAll() {
    return this.prodactModel.find()
  }


  
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.prodactModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const updatedProduct = await this.prodactModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID');
    }

    const deletedProduct = await this.prodactModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return { success: 'ok', message: `Product with ID ${id} deleted successfully` };
  }

}
