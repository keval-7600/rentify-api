import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingDocument } from "./schema/booking.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class BookingRepository {

    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>
    ) {}

    create(bookingData: Partial<Booking>) {
        return this.bookingModel.create(bookingData);
    }

    findOne(find, select = {}) {
        const { _id } = find;
        return this.bookingModel.aggregate([
            { $match: { _id: new Types.ObjectId(_id) } },
            {
                $lookup: {
                    from: 'payments',
                    localField: '_id',
                    foreignField: 'bookingId',
                    as: 'payment'
                }
            },
            { $unwind: { path: '$payment', preserveNullAndEmptyArrays: true } }
        ]);
    }

    findAll(find = {}, select = {}) {
        return this.bookingModel.find(find, select);
    }

}