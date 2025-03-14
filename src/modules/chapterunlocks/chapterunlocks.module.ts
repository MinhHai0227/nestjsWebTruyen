import { Module } from '@nestjs/common';
import { ChapterunlocksService } from './chapterunlocks.service';
import { ChapterunlocksController } from './chapterunlocks.controller';
import { ChaptersModule } from '../chapters/chapters.module';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';


@Module({
  controllers: [ChapterunlocksController],
  providers: [ChapterunlocksService,PrismaService],
  imports:[ChaptersModule,UsersModule,NotificationsModule]
})
export class ChapterunlocksModule {}
