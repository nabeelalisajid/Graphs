import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
