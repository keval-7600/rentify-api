import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ListingService } from './listing.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateListingDto } from './dto/create-listing.dto';
import { diskStorage } from 'multer';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { User } from '../user/schema/user.schema';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('listing')
@ApiTags('listing')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ListingController {

    constructor(
        private readonly listingService: ListingService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new listing' })
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FilesInterceptor('images', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName =
                    Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueName +file.originalname);
            }
        })
    }))
    @UseGuards(RolesGuard)
    @Roles(Role.OWNER)
    createListing(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createListingDto: CreateListingDto, @GetUser() user: User) {
        return this.listingService.createListing(files, createListingDto, user);
    }

    @Get()
    @ApiOperation({ summary: 'Get all listings' })
    getListings() {
        return this.listingService.getListings();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get listing by ID' })
    getListingById(@Param('id') id: string) {
        return this.listingService.getListingById(id);
    }
}
