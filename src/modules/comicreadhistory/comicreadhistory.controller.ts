import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicreadhistoryService } from './comicreadhistory.service';
import { CreateComicreadhistoryDto } from './dto/create-comicreadhistory.dto';
import { UpdateComicreadhistoryDto } from './dto/update-comicreadhistory.dto';

@Controller('comicreadhistory')
export class ComicreadhistoryController {
  constructor(private readonly comicreadhistoryService: ComicreadhistoryService) {}

  @Post()
  create(@Body() createComicreadhistoryDto: CreateComicreadhistoryDto) {
    return this.comicreadhistoryService.create(createComicreadhistoryDto);
  }

  @Get()
  findAll() {
    return this.comicreadhistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicreadhistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicreadhistoryDto: UpdateComicreadhistoryDto) {
    return this.comicreadhistoryService.update(+id, updateComicreadhistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicreadhistoryService.remove(+id);
  }
}
