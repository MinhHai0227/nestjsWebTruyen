import { Module } from '@nestjs/common';
import { ChapterimagesService } from './chapterimages.service';
import { ChapterimagesController } from './chapterimages.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  controllers: [ChapterimagesController],
  providers: [ChapterimagesService,PrismaService],
  imports: [ChaptersModule]
})
export class ChapterimagesModule {}
