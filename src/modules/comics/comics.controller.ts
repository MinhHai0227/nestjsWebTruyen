import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { Public } from 'src/decorator/setpublic';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Post()
  create(@Body() createComicDto: CreateComicDto) {
    return this.comicsService.create(createComicDto);
  }

  @Get()
  @Public()
  findAll(
    @Query('page') page: number = 1 ,
    @Query('limit') limit: number = 36,
  ) {
    return this.comicsService.findAll(page,limit);
  }

  @Get()
  findComicByName(@Query('search') search: string,)
  {
    return this.comicsService.findComicByName(search);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateComicDto: UpdateComicDto) {
    return this.comicsService.update(id, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.remove(id);
  }

  @Get(':id')
  @Public()
  findCateByComic(@Param('id', ParseIntPipe) id: number){
    return this.comicsService.findCateByComic(id);
  }
}
