import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ComicsService } from '../comics/comics.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ChaptersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly comicService: ComicsService,
  ){}

  async create(createChapterDto: CreateChapterDto) {

    await this.comicService.exisComic(createChapterDto.comic_id);

    const data = this.prisma.chapters.create({
      data: createChapterDto
    })

    return data;
  }

  async findAll() {
    return await this.prisma.chapters.findMany();
  }

  async findOne(id: number) {
   await this.exisChapter(id);

   const chapter = await this.prisma.chapters.findUnique({
    where:{chapter_id: id},
    include:{
      chapter_images: {
        select:{image_url:true}
      }
    }
   })

   if(!chapter){
    throw new HttpException('Chapter not founf',HttpStatus.NOT_FOUND)
   }

   const chapterimg = chapter.chapter_images.map(item => item.image_url)
   return {
    chapter_id: chapter.chapter_id,
    title: chapter.title,
    slug: chapter.slug,
    is_locked: chapter.is_locked,
    price_xu: chapter.price_xu,
    auto_unlock_time: chapter.auto_unlock_time,
    created_at: chapter.created_at,
    chapterimg: chapterimg
   }
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }

  async exisChapter(chapter_id: number){
    const chapter = await this.prisma.chapters.findUnique({
      where:{chapter_id}
    })

    if(!chapter){
      throw new HttpException('Chapter not found', HttpStatus.NOT_FOUND)
    }

    return chapter;
  }

  
  async updateUnlockChapter(id: number, status: boolean){
    await this.exisChapter(id)
    const chapter = this.prisma.chapters.update({
      where: {chapter_id: id},
      data: {
        is_locked: status
      }
    })
    return chapter
  }

  @Cron(CronExpression.EVERY_HOUR)
  async autounlockChapter(){
    let page = 1;
    const page_size = 100;

    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    while(true){
      const chapters = await this.prisma.chapters.findMany({
        where: {
          is_locked: true,
          auto_unlock_time:{
            gte: oneHourAgo,
            lte: new Date(),
          }
        },
        skip: (page -1 ) * page_size,
        take: page_size
      });

      if(chapters.length === 0){
        break;
      }

      await Promise.all(
        chapters.map( async (chapter) => {
          return await this.prisma.chapters.update({
            where: {chapter_id: chapter.chapter_id},
            data:{
              is_locked: false
            }
          })
        })
      )

      page++;
    }
  }

  
}
