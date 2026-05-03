import { PaymentService } from './payment.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { PaymentRepository } from './payment.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Payment.name,
                schema: PaymentSchema
            }
        ])
    ],
    controllers: [],
    providers: [
        PaymentService,
        PaymentRepository
    ],
    exports: [
        PaymentRepository,
        PaymentService
    ]
})
export class PaymentModule { }
