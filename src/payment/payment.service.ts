import { Injectable, BadRequestException } from '@nestjs/common';
import fetch from 'node-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './entities/user.entity';
import { PaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  async createPayment(paymentDto: PaymentDto) {
    if (
      !process.env.PAYZE_BASE_URL ||
      !process.env.PAYZE_API_KEY ||
      !process.env.PAYZE_API_SECRET
    ) {
      throw new BadRequestException('Payment service configuration is missing');
    }
    const amount = paymentDto.quantity;

    const response = await fetch(process.env.PAYZE_BASE_URL!, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `${process.env.PAYZE_API_KEY}:${process.env.PAYZE_API_SECRET}`,
      },
      body: JSON.stringify({
        source: 'Card',
        amount,
        currency: 'GEL',
        language: 'KA',
        hooks: {
          webhookGateway: 'https://rlsf57aevx.loclx.io/webhook',
          successRedirectGateway: 'http://localhost:3000?type=success',
          errorRedirectGateway: 'http://localhost:3000?type=error',
        },
      }),
    });

    if (!response.ok) {
      throw new BadRequestException('Failed to create payment');
    }

    const data = await response.json();

    const transaction = new this.transactionModel({
      userId: paymentDto.email,
      amount,
      status: 'pending',
    });

    await transaction.save();

    return data;
  }
}
