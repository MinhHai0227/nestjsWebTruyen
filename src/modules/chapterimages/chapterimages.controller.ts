import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ChapterimagesService } from './chapterimages.service';
import { CreateChapterimageDto } from './dto/create-chapterimage.dto';
import { UpdateChapterimageDto } from './dto/update-chapterimage.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('chapterimages')
export class ChapterimagesController {
  constructor(private readonly chapterimagesService: ChapterimagesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files',100,{
      storage: diskStorage({
        destination: 'uploads/chapter',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const ext = extname(file.originalname);
          const randomName = name + '-' + Date.now() + ext;
          callback(null, randomName)
        },
      })
    })
  )
  async create(
    @Body('chapter_id', ParseIntPipe) chapter_id: number,
    @UploadedFiles() files: Express.Multer.File[],  
  ) {
    try {
      if (!files || files.length === 0) {
        return {
          message: 'No files uploaded!',
        };
      }
  
      const chapterImages = await this.chapterimagesService.create(chapter_id, files);
  
      return {
        message: 'Images uploaded successfully!',
        images: chapterImages,
      };
    } catch (error) {
      throw new Error('Internal server error');
    }
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
