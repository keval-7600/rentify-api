import { Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from 'src/shared/enums/booking-status.enum';
import { Booking } from './schema/booking.schema';
import { Types } from 'mongoose';

@Injectable()
export class BookingService {

    constructor(
        private readonly bookingRepository: BookingRepository
    ) {}

    async createBooking(createBookingDto: CreateBookingDto, userId: Types.ObjectId) {

        const existingBooking = await this.bookingRepository.findOne({
            listingId: new Types.ObjectId(createBookingDto.listingId),
            startDate: createBookingDto.startDate,
            endDate: createBookingDto.endDate,
            status: { $in: [BookingStatus.PENDING, BookingStatus.PARTIAL, BookingStatus.CONFIRMED] },
        });

        if(existingBooking) {
            throw new Error('Listing is already booked for the selected dates');
        }

        const bookingData: Booking = {
            ...createBookingDto,
            listingId: new Types.ObjectId(createBookingDto.listingId),
            totalPrice: 520,
            status: BookingStatus.PENDING,
            userId: new Types.ObjectId(userId)
        };
        return this.bookingRepository.create(bookingData);
    }
}
