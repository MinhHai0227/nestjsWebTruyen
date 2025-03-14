import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { countries } from '@prisma/client';

@Injectable()
export class CountriesService {

  constructor(private readonly prisma: PrismaService){}

  async create(createCountryDto: CreateCountryDto):Promise<countries | null> {
    return await this.prisma.countries.create({
      data:{
        name: createCountryDto.name
      },
    });
  }

  async findAll() {
    return this.prisma.countries.findMany({
      include: {
        comics: true,
      }
    });
  }

  async findOne(country_id: number):Promise<countries | null> {
    const country = await this.prisma.countries.findUnique({
      where: {country_id} 
    })
    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return country
  }

  async update(country_id: number, updateCountryDto: UpdateCountryDto):Promise<countries | null> {
    await this.findOne(country_id);

    const updateCountry = await this.prisma.countries.update({
      where: {country_id: country_id},
      data : updateCountryDto,
    })

    return updateCountry;
  }

  async remove(country_id: number) {
    await this.findOne(country_id);
    await this.prisma.countries.delete({
      where: {country_id: country_id}
    })

    return {message: 'Xóa Country thành công'};
  }
}
