import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense-dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get()
  getAllExpense() {
    return this.expenseService.getAllExpense();
  }

  @Get(':id')
  getExpenseById(@Param('id') id) {
    console.log(id, 'id');
    return this.expenseService.getExpenseById(Number(id));
  }

  @Post()
  createExpense(@Body() CreateExpenseDto: CreateExpenseDto) {
    const category = CreateExpenseDto?.category;
    const productName = CreateExpenseDto?.productName;
    const quantity = CreateExpenseDto?.quantity;
    const price = CreateExpenseDto?.price;

    return this.expenseService.createExpense({
      category,
      productName,
      quantity,
      price,
    });
  }

  @Delete(':id')
  deleteExpenseById(@Param('id') id) {
    return this.expenseService.delateExpenseById(Number(id));
  }

  @Put(':id')
  updateExpense(@Param('id') id, @Body() updateExpenseDto: CreateExpenseDto) {
    return this.expenseService.updateExpenseById(Number(id), updateExpenseDto);
  }
}
