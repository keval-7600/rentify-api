import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Module } from '@nestjs/common';
import { Booking, BookingSchema } from './schema/booking.schema';
import { BookingRepository } from './booking.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Booking.name,
                schema: BookingSchema
            }
        ])
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
