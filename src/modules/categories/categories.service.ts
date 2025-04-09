import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { categories } from '@prisma/client';
import { PaninationService } from 'src/helpers/panination.service';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly paninationService: PaninationService,
  ){}

  async create(createCategoryDto: CreateCategoryDto):Promise<categories> {
    return await this.prisma.categories.create({
      data: createCategoryDto,
    })
  }

  async findAll() {
    return this.prisma.categories.findMany();
  }

  async findOne(category_id: number) {
    const exisCate =  await this.prisma.categories.findUnique({
      where: {category_id}
    })

    if(!exisCate){
      throw new HttpException('Category not found',HttpStatus.NOT_FOUND);
    }
    return exisCate;
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(category_id);
    const updateCate = await this.prisma.categories.update({
      where: {category_id: category_id},
      data: updateCategoryDto
    })

    return updateCate;
  }

  async remove(category_id: number) {
    await this.findOne(category_id);
    await this.prisma.categories.delete({
      where: {category_id: category_id}
    })

    return {message: 'Xóa Category thành công'}
  }

  async validateCategoryIds(id: number[]){
    const existingCategories = await this.prisma.categories.findMany({
      where: {
        category_id: {in: id }
      },
      select: {category_id: true},
    })
    const existingCategoryIds = existingCategories.map(c => c.category_id);

    const invalidIds = id.filter(id => !existingCategoryIds.includes(id));

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Các categoryId sau không tồn tại: ${invalidIds.join(', ')}`
      );
    }

    return existingCategoryIds;
  }

  async findComicByCategory(category_id: number, page: number, limit: number) {

    const{skip, take} = this.paninationService.calcPanination(page, limit);

    const cate = await this.prisma.categories.findUnique({
      where: {category_id: category_id},
      include:{
        comic_categories:{
          take,
          skip,
          select:{comics: true},        
        }
      }
    })

    if(!cate){
      throw new HttpException('Category not found',HttpStatus.NOT_FOUND);
    }

    const comics = cate.comic_categories.map(item => item.comics);
    const totalPage = this.paninationService.calcTotalPage(comics.length+1,limit);
    const nextPage = this.paninationService.nextPage(page, totalPage);
    const prevPage = this.paninationService.prevPage(page);
    const currenPage = page;
    
    return {
      category_id: cate.category_id,
      name: cate.name,
      slug: cate.slug,
      description: cate.description,
      comics: comics,
      totalPage,
      nextPage,
      prevPage,
      currenPage
    };

  }
}
