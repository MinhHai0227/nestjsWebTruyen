import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChapterunlocksService } from './chapterunlocks.service';
import { JwtAuthGuard } from 'src/auth/pasport/jwt-auth.guard';

@Controller('chapterunlocks')
export class ChapterunlocksController {
  constructor(private readonly chapterunlocksService: ChapterunlocksService) {}

  @Get(':chapterid')
  @UseGuards(JwtAuthGuard)
  exisUserUnlock(
    @Request() req,
    @Param('chapterid', ParseIntPipe) chapterid: number,
  ) {
    const userid = req.user.userId;
    return this.chapterunlocksService.exisUserUnlock(userid, chapterid);
  }

  @Post(':chapterid')
  @UseGuards(JwtAuthGuard)
  unlockChapterForUser(
    @Request() req,
    @Param('chapterid', ParseIntPipe) chapterid: number,
  ) {
    const userid = req.user.userId;
    return this.chapterunlocksService.unlockChapterForUser(userid, chapterid);
  }
}
