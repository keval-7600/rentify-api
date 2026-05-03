import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { Payment } from './schema/payment.schema';
import { Types } from 'mongoose';

interface CreatePaymentInput {
  bookingId: Types.ObjectId;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: {
    amount: number;
    dueDate: Date;
    paid: boolean;
  }[];
}

@Injectable()
export class PaymentService {

    constructor(
        private readonly paymentRepository: PaymentRepository
    ) {}

    async createPayment(paymentData: CreatePaymentInput) {
        return await this.paymentRepository.create(paymentData);
    }

}
