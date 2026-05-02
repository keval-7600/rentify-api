import { ListingModule } from './modules/listing/listing.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rectify-api';
@Module({
  imports: [
    UserModule,
    AuthModule,
    ListingModule,
    MongooseModule.forRoot(mongoUri),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
      serveRoot: '/uploads'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
