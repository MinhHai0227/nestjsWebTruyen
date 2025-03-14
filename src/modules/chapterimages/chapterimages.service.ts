import { Injectable } from '@nestjs/common';
import { CreateChapterimageDto } from './dto/create-chapterimage.dto';
import { UpdateChapterimageDto } from './dto/update-chapterimage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersService } from '../chapters/chapters.service';

@Injectable()
export class ChapterimagesService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly chapterService :ChaptersService
  ){}

  async create(createChapterimageDto: CreateChapterimageDto) {
    await this.chapterService.exisChapter(createChapterimageDto.chapter_id);

    const chapterimg = await this.prisma.chapter_images.create({
      data: createChapterimageDto
    })

    return chapterimg;
  }

  findAll() {
    return `This action returns all chapterimages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapterimage`;
  }

  update(id: number, updateChapterimageDto: UpdateChapterimageDto) {
    return `This action updates a #${id} chapterimage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapterimage`;
  }
}
