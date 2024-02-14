import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { DataService } from './data.service';
// import { Model } from 'mongoose';

class MockDataModel {
  static find() {
    return this;
  }
  static skip() {
    return this;
  }
  static limit() {
    return this;
  }
  static exec() {
    return Promise.resolve([]);
  }
  static countDocuments() {
    return this;
  }
}

describe('DataService', () => {
  let service: DataService;
  let controller: DataController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers: [
        DataService,
        {
          provide: 'DataModel',
          useValue: MockDataModel,
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
    controller = module.get<DataController>(DataController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
  it('should return batch data', async () => {
    const page = 1;
    const mockData = { count: 5, data: [], limit: 5 };
    jest.spyOn(service, 'getBatchData').mockResolvedValue(mockData);

    const result = await controller.getBatchData({ p: page });
    expect(result).toEqual(mockData);
  });
  it('should return random data', () => {
    const mockData = [{ country: 'test', color: 'test', data: [] }];
    jest.spyOn(service, 'getRandomData').mockReturnValue(mockData);

    const result = controller.getRandomData();
    expect(result).toEqual(mockData);
  });
  it('should return batch data', async () => {
    const page = 1;
    const result = await service.getBatchData(page);
    expect(result).toBeDefined();
    expect(result.data.length).toBe(0);
    expect(result.limit).toBe(5);
  });
  it('should return random data', () => {
    const result = controller.getRandomData();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });
});
