import { Module } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CountriesModule } from '../countries/countries.module';
import { PaninationService } from 'src/helpers/panination.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports:[PrismaModule, CountriesModule,CategoriesModule],
  controllers: [ComicsController],
  providers: [ComicsService, PaninationService],
  exports:[ComicsService]
})
export class ComicsModule {}
