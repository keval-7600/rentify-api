import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateListingDto } from "./dto/create-listing.dto";
import { User } from "../user/schema/user.schema";
import { ListingRepository } from "./listing.repository";
import { ObjectId } from "mongodb";
import * as fs from 'fs/promises';
import { Types } from "mongoose";

@Injectable()
export class ListingService {
    baseUrl = 'http://localhost:3000';
    constructor(
        private readonly listingRepository: ListingRepository
    ) {

    }

    async createListing(files: Express.Multer.File[], data: CreateListingDto, user: User) {
        try {
            const propertyExist = await this.listingRepository.findOne({title: data.title, ownerId: user._id});
            
            if (propertyExist) {
                throw new ConflictException(`Your property with ${data.title} already exists!`);
            }
            
            const fileNames = files.map(x => x.filename);
            
            const listingObj = {
                ...data,
                _id: new ObjectId(),
                images: fileNames,
                ownerId: user._id
            };
        
            return await this.listingRepository.create(listingObj);
        }
        catch(err) {
             // cleanup uploaded files
            if (files?.length) {
                await Promise.all(
                    files.map(file => fs.unlink(file.path).catch(() => {}))
                );
            }

            throw err;
        }
    }

    async getListings() {
        const data = await this.listingRepository.findAll();
        return {
            data: data?.map((listing) => {
                if(listing?.images?.length) {
                    listing.images = listing.images.map(image => `${this.baseUrl}/uploads/${image}`) as any;
                }
                return listing;
            }), 
            message: 'Listings fetched successfully!'
        };
    }

    async getListingById(id: string) {
        const listing = await this.listingRepository.findOne({_id: new Types.ObjectId(id)});
        if(!listing) {
            throw new NotFoundException('Listing not found!');
        }
        return {data: listing, message: 'Listing fetched successfully!'};
    }
}