import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rectify-api';
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
