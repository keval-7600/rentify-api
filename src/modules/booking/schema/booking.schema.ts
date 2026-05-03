import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Listing } from "src/modules/listing/schema/listing.schema";
import { User } from "src/modules/user/schema/user.schema";
import { BookingStatus } from "src/shared/enums/booking-status.enum";
import { PaymentType } from "src/shared/enums/payment-type.enum";

export type BookingDocument = Booking & Document;

@Schema({timestamps: true})
export class Booking {
    @Prop({type: Types.ObjectId, ref: Listing.name, required: true})
    listingId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: User.name, required: true})
    userId: Types.ObjectId;

    @Prop({required: true})
    startDate: Date;

    @Prop({required: true})
    endDate: Date;

    @Prop({required: true})
    totalPrice: number;

    @Prop({required: true, enum: PaymentType})
    paymentType: PaymentType;

    @Prop({required: true, enum: BookingStatus})
    status: BookingStatus;

}

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ listingId: 1 });
BookingSchema.index({ userId: 1 });
BookingSchema.index({ status: 1 });