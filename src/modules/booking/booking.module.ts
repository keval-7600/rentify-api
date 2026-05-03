import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Module } from '@nestjs/common';
import { Booking, BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './booking.repository';
import { PaymentModule } from '../payment/payment.module';
import { ListingModule } from '../listing/listing.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Booking.name,
                schema: BookingSchema
            }
        ]),
        PaymentModule,
        ListingModule
    ],
    controllers: [
        BookingController,
    ],
    providers: [
        BookingService,
        BookingRepository
    ],
})
export class BookingModule { }
