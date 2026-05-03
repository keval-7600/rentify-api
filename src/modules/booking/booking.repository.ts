import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingDocument } from "./schema/booking.schema";
import { Model } from "mongoose";

@Injectable()
export class BookingRepository {

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>
    ) {}

    create(bookingData: Partial<Booking>) {
        return this.bookingModel.create(bookingData);
    }

    findOne(find, select = {}) {
        return this.bookingModel.findOne(find, select);
    }

    findAll(find = {}, select = {}) {
        return this.bookingModel.find(find, select);
    }

}