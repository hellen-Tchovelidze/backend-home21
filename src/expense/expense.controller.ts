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
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense-dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get()
  getAllExpenses(
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('category') category: string,
    @Query('priceFrom') priceFrom: string,
    @Query('priceTo') priceTo: string,
  ) {
    return this.expenseService.getAllExpense(
      Number(page) || 1,
      Number(take) || 30,
      {
        category,
        priceFrom: priceFrom ? Number(priceFrom) : undefined,
        priceTo: priceTo ? Number(priceTo) : undefined,
      },
    );
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
