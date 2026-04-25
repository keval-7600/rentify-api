import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Listing, ListingDocument } from "./schema/listing.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ListingRepository {
    constructor(
        @InjectModel(Listing.name) private readonly listingModel: Model<ListingDocument> 
    ) {}

    create(listingData: Partial<Listing>) {
        return this.listingModel.create(listingData);
    }

    findOne(find, select = {}) {
        return this.listingModel.findOne(find, select);
    }

    findAll(find = {}, select = {}) {
        return this.listingModel.find(find, select);
    }
}