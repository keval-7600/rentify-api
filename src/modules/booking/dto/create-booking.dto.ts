import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { PaymentType } from "src/shared/enums/payment-type.enum";

export class CreateBookingDto {
    @IsNotEmpty({ message: 'Listing ID is required' })
    @IsMongoId({ message: 'Invalid listing ID format' })
    @ApiProperty({ description: 'ID of the listing being booked', example: '664f1c2a8f1b2c0012a4d123' })
    listingId: string;

    @IsNotEmpty({ message: 'Start date is required' })
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    @ApiProperty({ description: 'Start date of the booking', example: '2022-01-01' })
    startDate: Date;

    @IsNotEmpty({ message: 'End date is required' })
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    @ApiProperty({ description: 'End date of the booking', example: '2022-01-07' })
    endDate: Date;

    @IsNotEmpty({ message: 'Payment type is required'})
    @IsEnum(PaymentType, { message: 'Invalid payment type' })
    @ApiProperty({ description: 'Payment type for the booking', example: PaymentType.FULL })
    paymentType: PaymentType;
}