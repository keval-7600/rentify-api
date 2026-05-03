import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment, PaymentDocument } from "./schema/payment.schema";

@Injectable()
export class PaymentRepository {

    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
    ) {}

    create(paymentData: Partial<Payment>) {
        return this.paymentModel.create(paymentData);
    }

    findOne(find, select = {}) {
        return this.paymentModel.findOne(find, select);
    }

    findAll(find = {}, select = {}) {
        return this.paymentModel.find(find, select);
    }
}