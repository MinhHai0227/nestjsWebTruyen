import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicfollowersService } from './comicfollowers.service';
import { CreateComicfollowerDto } from './dto/create-comicfollower.dto';
import { UpdateComicfollowerDto } from './dto/update-comicfollower.dto';

@Controller('comicfollowers')
export class ComicfollowersController {
  constructor(private readonly comicfollowersService: ComicfollowersService) {}

  @Post()
  create(@Body() createComicfollowerDto: CreateComicfollowerDto) {
    return this.comicfollowersService.create(createComicfollowerDto);
  }

  @Get()
  findAll() {
    return this.comicfollowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicfollowersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComicfollowerDto: UpdateComicfollowerDto) {
    return this.comicfollowersService.update(+id, updateComicfollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicfollowersService.remove(+id);
  }
}
