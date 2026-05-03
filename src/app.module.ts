import { BookingModule } from './modules/booking/booking.module';
import { ListingModule } from './modules/listing/listing.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    BookingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
