import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComicDto } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountriesService } from '../countries/countries.service';
import { PaninationService } from 'src/helpers/panination.service';
import { comics } from '@prisma/client';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ComicsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly countryService: CountriesService,
    private readonly paninationService: PaninationService, 
    private readonly categoryService: CategoriesService
  ){}

  async create(createComicDto: CreateComicDto):Promise<comics> {

    await this.categoryService.validateCategoryIds(createComicDto.categoryIds);

    await this.countryService.findOne(createComicDto.country_id);

    const { categoryIds, ...comicData } = createComicDto;

    return await this.prisma.comics.create({
      data: {
        ...comicData,
        comic_categories: {
          create: categoryIds.map(categoryIds => ({
            categories: { connect:{category_id: categoryIds}}
          }))
        },
      },
      include:{ comic_categories: true}
    })
  }

  async findAll(page: number, limit: number):Promise<{
    data: comics[];
    totalPage: number,
    currenPage: number; 
    nextPage: number; 
    prevPage: number
  }
  > {
    const{skip, take} = this.paninationService.calcPanination(page,limit);

    const[Comics, totalComic] = await Promise.all([
      this.prisma.comics.findMany({
        skip,
        take,
        orderBy:{
          created_at: 'desc',
        },
      }),
      this.prisma.comics.count(),
    ])

    const totalPage = this.paninationService.calcTotalPage(totalComic,limit);
    const nextPage = this.paninationService.nextPage(page, totalPage);
    const prevPage = this.paninationService.prevPage(page);
    const currenPage = page;

    return{
      data: Comics,
      totalPage,
      nextPage,
      prevPage,
      currenPage
    };
  }
  
  async update(comic_id: number, updateComicDto: UpdateComicDto):Promise<comics | null> {
    const exisComic = await this.prisma.comics.findUnique({
      where: {comic_id}
    })

    if(!exisComic){
      throw new HttpException('Comic not found', HttpStatus.NOT_FOUND);
    }

    const updateComic = await this.prisma.comics.update({
      where: {comic_id},
      data: updateComicDto,
    })

    return updateComic;
    
  }

  async remove(comic_id: number) {
    const exisComic = await this.prisma.comics.findUnique({
      where: {comic_id}
    })

    if(!exisComic){
      throw new HttpException('Comic not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.comics.delete({
      where: {comic_id}
    })
    
    return {message:" Xóa Comic thành công"}
  }

  async findComicByName(title: string){
    const comic = await this.prisma.comics.findMany({
      where: {
        title: {
          contains: title,
        }
      },
      take: 5,
    });
    return comic;
  }

  async findCateByComic(comic_id: number){
    const comic = await this.prisma.comics.findUnique({
      where:{comic_id: comic_id},
      include:{
        chapters:{
          orderBy:{
            created_at: 'desc'
          }
        },
        comic_categories:{
          select:{categories:{
            select:{name: true}
          }}
        }
      }
    })

    if (!comic) {
      throw new HttpException('Comic not found', HttpStatus.NOT_FOUND);
    }


    const categories = comic.comic_categories.map(item => item.categories.name);
    return {
      comic_id: comic.comic_id,
      title: comic.title,
      description: comic.description,
      status: comic.status == 'DANG_RA' ? 'Đang cập nhật' : 'Đã hoàn thành',
      author: comic.author,
      cover_image: comic.cover_image,
      views: comic.views,
      likes: comic.likes,
      chapters: comic.chapters,
      categories: categories,
    }
  }

  async exisComic(comic_id: number){
    const comic = await this.prisma.comics.findUnique({
      where:{comic_id},
    })

    if(!comic){
      throw new HttpException('Comic not found', HttpStatus.NOT_FOUND)
    }

    return comic;
  }
}
