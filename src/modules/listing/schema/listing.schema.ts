import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ _id: false }) // prevents creating separate _id for subdoc
export class Location {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

export type ListingDocument = Listing & Document;

@Schema({timestamps: true})
export class Listing {

    @Prop()
    _id: Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: LocationSchema})
    location: Location;

    @Prop()
    pricePerDay: number;

    @Prop({type: Types.ObjectId, ref: 'User'})
    ownerId: Types.ObjectId;

    @Prop()
    images?: string[];

    @Prop()
    features?: string[];

    @Prop({default: true})
    is_active: boolean;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);