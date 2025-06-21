import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import { PaymentDto } from './dto/create-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment')
  async createPayment(@Body() paymentDto: PaymentDto, @Res() res: Response) {
    try {
      const data = await this.paymentService.createPayment(paymentDto);
      return res.json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || 'Payment creation failed' });
    }
  }

  @Post('webhook')
  async webhook(@Body() body: any, @Res() res: Response) {
    console.log(body, 'req.bodyyyy');
    const { PaymentStatus } = body;
    if (PaymentStatus === 'Captured') {
      console.log('warmatebit gadaixardaaaa');
    }
    if (PaymentStatus === 'Rejected') {
      console.log('ver gadaixadaaaa');
    }
    return res.send('ok');
  }
}
