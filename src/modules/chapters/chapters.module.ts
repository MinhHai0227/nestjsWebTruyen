import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { ComicsModule } from '../comics/comics.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService,PrismaService],
  imports: [ComicsModule],
  exports: [ChaptersService]
})
export class ChaptersModule {}
