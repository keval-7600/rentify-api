import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";

class LocationDto {
  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString()
  state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString()
  country: string;
}

export class CreateListingDto {

    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @MinLength(20, { message: 'Description must be at least 20 characters long' })
    description: string;

    @IsNotEmpty({ message: 'Location is required' })
    @Transform(({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return {};
        }
      }
      return value;
    })
    // @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNotEmpty({ message: 'Price per day is required' })
    @Type(() => Number)
    @IsNumber()
    @Min(50, { message: 'Price per day must be at least $50' })
    pricePerDay: number;

    @IsOptional()
    @Transform(({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      }
      return value;
    })
    @IsString({each: true})
    features: string[];
}