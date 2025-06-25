// import { Module } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Product, ProductSchema } from './entities/product.entity';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
//   ],
//   controllers: [ProductsController],
//   providers: [ProductsService],
// })
// export class ProductsModule {}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './entities/product.entity';
import { User, userSchema } from '../users/entities/user.entity';  

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },   
      { name: 'user', schema: userSchema },         
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
