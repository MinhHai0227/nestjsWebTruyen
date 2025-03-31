import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { Public } from 'src/decorator/setpublic';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('comics')
export class ComicsController {
  constructor(private readonly comicsService: ComicsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/chapter',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const ext = extname(file.originalname);
          const randomName = name + '-' + Date.now() + ext;
          callback(null, randomName);
        },
      }),
    }),
  )
  create(
    @Body() createComicDto: CreateComicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.comicsService.create(createComicDto, file);
  }

  @Get()
  @Public()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 36) {
    return this.comicsService.findAll(page, limit);
  }

  @Public()
  @Get('search')
  findComicByName(@Query('q') keyword: string) {
    return this.comicsService.findComicByName(keyword);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComicDto: UpdateComicDto,
  ) {
    return this.comicsService.update(id, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.remove(id);
  }

  @Get(':id')
  @Public()
  findCateByComic(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.findCateByComic(id);
  }
}
