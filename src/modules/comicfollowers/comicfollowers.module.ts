import { Module } from '@nestjs/common';
import { ComicfollowersService } from './comicfollowers.service';
import { ComicfollowersController } from './comicfollowers.controller';

@Module({
  controllers: [ComicfollowersController],
  providers: [ComicfollowersService],
})
export class ComicfollowersModule {}
