import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Booking } from "src/modules/booking/schema/booking.schema";

@Schema({_id: false}) 
class Installment {
    @Prop({required: true})
    amount: number;

    @Prop({required: true})
    dueDate: Date;

    @Prop({default: false})
    paid: boolean;

    @Prop()
    paidDate?: Date
}

export type PaymentDocument = Payment & Document;

@Schema({timestamps: true})
export class Payment {

    @Prop({type: Types.ObjectId, ref: Booking.name, required: true})
    bookingId: Types.ObjectId;

    @Prop({required: true})
    totalAmount: number;

    @Prop({required: true})
    paidAmount: number;

    @Prop({required: true})
    remainingAmount: number;

    @Prop({required: true, type: [Installment]})
    installments: Installment[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ bookingId: 1 });