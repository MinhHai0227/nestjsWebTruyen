import { Module } from '@nestjs/common';
import { ComicreadhistoryService } from './comicreadhistory.service';
import { ComicreadhistoryController } from './comicreadhistory.controller';

@Module({
  controllers: [ComicreadhistoryController],
  providers: [ComicreadhistoryService],
})
export class ComicreadhistoryModule {}
