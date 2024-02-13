import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataService } from './data/data.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await populateDBMS(app);
  await app.listen(5000);
}
bootstrap();

// check if the data is in the mongo table  skip otherwise populate the data

async function populateDBMS(app: any) {
  const dataService = app.get(DataService);
  const data = await dataService.findCount();
  if (data === 0) {
    await dataService.popluateData();
  }
}
