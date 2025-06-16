import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense-dto';
import { UpdateExpenseDto } from './dto/update-expense-dto';

@Injectable()
export class ExpenseService {
  private expense = [
    {
      id: 1,
      category: 'Food',
      productName: 'Pizza',
      quantity: 2,
      price: 15,
      totalPrice: 30,
    },
    {
      id: 2,
      category: 'Transport',
      productName: 'Bus Ticket',
      quantity: 5,
      price: 2,
      totalPrice: 10,
    },
  ];

  getAllExpense() {
    return this.expense;
  }

  getExpenseById(id: number) {
    const expense = this.expense.find((el) => el.id === id);
    return expense;
  }

  createExpense({ category, productName, quantity, price }: CreateExpenseDto) {
    if (!category || !productName || !quantity || !price) {
      throw new HttpException(
        'name and email are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const lastId = this.expense.length
      ? this.expense[this.expense.length - 1]?.id
      : 0;

    const newExpense = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice: quantity * price,
    };
    this.expense.push(newExpense);

    return 'created successfully';
  }

  delateExpenseById(id: number) {
    const index = this.expense.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('User not found');

    this.expense.splice(index, 1);

    return 'User deleted successfully';
  }

  updateExpenseById(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expense.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('User not found');

    const updateReq: UpdateExpenseDto = {};
    if (updateExpenseDto.category) {
      updateReq.category = updateExpenseDto.category;
    }

    if (updateExpenseDto.productName) {
      updateReq.productName = updateExpenseDto.productName;
    }

    if (updateExpenseDto.quantity) {
      updateReq.quantity = updateExpenseDto.quantity;
        updateReq.totalPrice = updateExpenseDto.quantity * (updateExpenseDto.price || this.expense[index].price);
    }
    if (updateExpenseDto.price) {
      updateReq.price = updateExpenseDto.price;
        updateReq.totalPrice = (updateExpenseDto.quantity || this.expense[index].quantity) * updateExpenseDto.price;
    }
    
  
    

    this.expense[index] = {
      ...this.expense[index],
      ...updateReq,
      
    };

    return 'User update successfully';
  }
}
