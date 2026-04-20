import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './schema/user.schema';
import { UserRespository } from './user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            }
        ])
    ],
    controllers: [
        UserController,
    ],
    exports: [
        UserRespository
    ],
    providers: [
        UserRespository
    ],
})
export class UserModule { }
