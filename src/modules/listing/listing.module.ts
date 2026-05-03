import { ListingController } from './listing.controller';
import { Module } from '@nestjs/common';
import { ListingSchema } from './schema/listing.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Listing',
                schema: ListingSchema
            }
        ])
    ],
    controllers: [
        ListingController,
    ],
    providers: [
        ListingService, 
        ListingRepository
    ],
    exports: [
        ListingService
    ]
})
export class ListingModule { }
