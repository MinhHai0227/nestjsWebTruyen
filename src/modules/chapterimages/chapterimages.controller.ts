import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChapterimagesService } from './chapterimages.service';
import { CreateChapterimageDto } from './dto/create-chapterimage.dto';
import { UpdateChapterimageDto } from './dto/update-chapterimage.dto';

@Controller('chapterimages')
export class ChapterimagesController {
  constructor(private readonly chapterimagesService: ChapterimagesService) {}

  @Post()
  create(@Body() createChapterimageDto: CreateChapterimageDto) {
    return this.chapterimagesService.create(createChapterimageDto);
  }

  @Get()
  findAll() {
    return this.chapterimagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chapterimagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterimageDto: UpdateChapterimageDto) {
    return this.chapterimagesService.update(+id, updateChapterimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chapterimagesService.remove(+id);
  }

}
