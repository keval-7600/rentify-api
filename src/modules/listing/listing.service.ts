import { ConflictException, Injectable } from "@nestjs/common";
import { CreateListingDto } from "./dto/create-listing.dto";
import { User } from "../user/schema/user.schema";
import { ListingRepository } from "./listing.repository";
import { ObjectId } from "mongodb";
import * as fs from 'fs/promises';

@Injectable()
export class ListingService {

    constructor(
        private readonly listingRepository: ListingRepository
    ) {

    }

    async createListing(files: Express.Multer.File[], data: CreateListingDto, user: User) {
        try {
            const propertyExist = this.listingRepository.findOne({title: data.title, ownerId: user._id});
            
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
        return await this.listingRepository.findAll();
    }
}