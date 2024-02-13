import { Controller, Get, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { TData } from './dto/numeric.datatype';
import { IData } from './interface/data.interface';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getBatchData(@Query() query): Promise<IData[]> {
    const p = query.p || 1;
    return this.dataService.getBatchData(p);
  }

  @Get('random')
  getRandomData(): TData[] {
    return this.dataService.getRandomData();
  }
}
