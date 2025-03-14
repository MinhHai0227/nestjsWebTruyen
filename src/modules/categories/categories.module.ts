import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaninationService } from 'src/helpers/panination.service';

@Module({
  imports:[PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PaninationService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
