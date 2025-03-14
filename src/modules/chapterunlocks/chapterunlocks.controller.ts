import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChapterunlocksService } from './chapterunlocks.service';
import { CreateChapterunlockDto } from './dto/create-chapterunlock.dto';
import { UpdateChapterunlockDto } from './dto/update-chapterunlock.dto';

@Controller('chapterunlocks')
export class ChapterunlocksController {
  constructor(private readonly chapterunlocksService: ChapterunlocksService) {}

  @Post()
  create(@Body() createChapterunlockDto: CreateChapterunlockDto) {
    return this.chapterunlocksService.create(createChapterunlockDto);
  }

  @Get()
  findAll() {
    return this.chapterunlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterunlocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterunlockDto: UpdateChapterunlockDto) {
    return this.chapterunlocksService.update(+id, updateChapterunlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterunlocksService.remove(+id);
  }

  @Post(':userid/:chapterid')
  unlockChapterForUser(
    @Param('userid', ParseIntPipe) userid: number,
    @Param('chapterid', ParseIntPipe) chapterid: number,
  ){
    return this.chapterunlocksService.unlockChapterForUser(userid,chapterid)
  }
}
