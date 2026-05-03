import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/shared/enums/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('booking')
@ApiTags('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {
    
    constructor(
        private readonly bookingService: BookingService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiBearerAuth()
    @Roles(Role.USER)
    createBooking(@Body() createBookingDto: CreateBookingDto, @GetUser() user: User) {
        return this.bookingService.createBooking(createBookingDto, user._id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get booking by ID' })
    @ApiBearerAuth()
    getBookingById(@GetUser() user: User, @Param('id') id: string) {
        return this.bookingService.getBookingById(id);
    }
}
