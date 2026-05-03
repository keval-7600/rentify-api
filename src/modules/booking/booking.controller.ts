import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/schema/user.schema';

@Controller('booking')
@ApiTags('booking')
export class BookingController {
    
    constructor(
        private readonly bookingService: BookingService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    createBooking(@Body() createBookingDto: CreateBookingDto, @GetUser() user: User) {
        return this.bookingService.createBooking(createBookingDto, user._id);
    }
}
