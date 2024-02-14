import { Injectable, Logger } from '@nestjs/common';
import { TData } from './dto/numeric.datatype';
import { InjectModel } from '@nestjs/mongoose';
import { IData, TBatchData } from './interface/data.interface';
import { Model } from 'mongoose';
@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);
  constructor(@InjectModel('Data') private readonly dataModel: Model<IData>) {}
  async getBatchData(page: number): Promise<TBatchData> {
    const limit = 5;
    const skip = (page - 1) * limit;
    const [data, count] = await Promise.all([
      this.dataModel.find().skip(skip).limit(limit).exec(),
      this.dataModel.countDocuments().exec(),
    ]);
    return {
      count: count,
      data: data,
      limit: limit,
    };
  }

  getRandomData(): TData[] {
    const countries = ['japn', 'france', 'us', 'germany', 'norway'];
    const colors = [
      `hsl(0,70%, 50%)`,
      `hsl(120,70%, 50%)`,
      `hsl(240,70%, 50%)`,
      `hsl(60,70%, 50%)`,
      `hsl(300,70%, 50%)`,
    ];
    const randomCountryData: TData[] = [];
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i];
      // const randomNumber = this.getRandomInt(0, 360);
      const color = colors[i];
      const countryData = {
        country: country,
        color: color,
        data: [],
      };
      for (let j = 0; j < 12; j++) {
        const transportationMode = [
          'plane',
          'helicopter',
          'boat',
          'train',
          'subway',
          'bus',
          'car',
          'moto',
          'bicycle',
          'horse',
          'skateboard',
          'others',
        ][j];

        const y = this.getRandomInt(0, 300);

        countryData.data.push({ x: transportationMode, y: y });
      }
      randomCountryData.push(countryData);
    }
    return randomCountryData;
  }
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async findCount(): Promise<number> {
    const count = await this.dataModel.countDocuments().exec();
    this.logger.debug(`finding count ${count}`);

    return count;
  }

  async popluateData(): Promise<boolean> {
    const randomInt = this.getRandomInt(100, 1000);
    this.logger.log('populating data', randomInt);
    for (let i = 0; i < randomInt; i++) {
      const data = this.getRandomData();
      // this.logger.debug(data);
      await this.dataModel.insertMany(data);
    }
    return true;
  }
}
