import { Injectable } from '@nestjs/common';
import { CreateChapterimageDto } from './dto/create-chapterimage.dto';
import { UpdateChapterimageDto } from './dto/update-chapterimage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChaptersService } from '../chapters/chapters.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChapterimagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chapterService: ChaptersService,
    private readonly configService: ConfigService,
  ) {}

  async create(chapter_id: number, files: Express.Multer.File[]) {
    await this.chapterService.exisChapter(chapter_id);

    const images = files.map((file) => ({
      chapter_id: chapter_id,
      image_url: `${this.configService.get<string>('HTTP_UPLOAD')}/uploads/chapter/${file.filename}`,
    }));

    return await this.prisma.chapter_images.createMany({
      data: images,
    });
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
