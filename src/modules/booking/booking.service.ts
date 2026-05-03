import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from 'src/shared/enums/booking-status.enum';
import { Booking } from './schema/booking.schema';
import { Types } from 'mongoose';
import { ListingService } from '../listing/listing.service';
import { PaymentType } from 'src/shared/enums/payment-type.enum';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class BookingService {

    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly listingService: ListingService,
        private readonly paymentService: PaymentService
    ) {}

    async createBooking(createBookingDto: CreateBookingDto, userId: Types.ObjectId) {

        const listingExists = await this.listingService.getListingById(createBookingDto.listingId);
        
        if(!listingExists?.data) {
            throw new NotFoundException('Listing not found');
        }

        const start = new Date(createBookingDto.startDate);
        const end = new Date(createBookingDto.endDate);

        if (start >= end) {
            throw new BadRequestException('End date must be after start date');
        }

        const existingBooking = await this.bookingRepository.findOne({
            listingId: new Types.ObjectId(createBookingDto.listingId),
            startDate: { $lte: end },
            endDate: { $gte: start },
            status: { $in: [BookingStatus.PENDING, BookingStatus.PARTIAL, BookingStatus.CONFIRMED] },
        });

        if(existingBooking) {
            throw new ConflictException('Listing is already booked for the selected dates');
        }

        const { pricePerDay } = listingExists?.data;
        
        const days = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );
        const totalPrice = days * pricePerDay;

        const bookingData: Booking = {
            ...createBookingDto,
            listingId: new Types.ObjectId(createBookingDto.listingId),
            totalPrice: totalPrice,
            status: BookingStatus.PENDING,
            userId: new Types.ObjectId(userId)
        };
        const booking = await this.bookingRepository.create(bookingData);

        const { paymentType } = createBookingDto;

        if(paymentType === PaymentType.FULL) {
            // handle full payment
            const paymentData = {
                bookingId: booking._id,
                totalAmount: totalPrice,
                paidAmount: 0,
                remainingAmount: totalPrice,
                installments: [
                    {
                        amount: totalPrice,
                        dueDate: new Date(),
                        paid: false
                    }
                ]
            };

            await this.paymentService.createPayment(paymentData);

            return {data: booking, message: 'Booking created successfully! Please proceed to payment.'};
        } else {
            // handle installment payment
            const first = Math.floor(totalPrice / 2);
            const second = totalPrice - first;
            const paymentData = {
                bookingId: booking._id,
                totalAmount: totalPrice,
                paidAmount: 0,
                remainingAmount: totalPrice,
                installments: [
                    {
                        amount: first,
                        dueDate: new Date(),
                        paid: false
                    },
                    {
                        amount: second,
                        dueDate: new Date(start.getTime() - 2 * 24 * 60 * 60 * 1000), // due in 7 days
                        paid: false
                    }
                ]
            };

            await this.paymentService.createPayment(paymentData);

            return {data: booking, message: 'Booking created successfully! Please proceed to payment.'};
        }

    }

    async getBookingById(bookingId: string) {
        const booking = await this.bookingRepository.findOne({ _id: new Types.ObjectId(bookingId) });
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }
        return booking;
    }
}
