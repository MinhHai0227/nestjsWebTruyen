import { Injectable } from '@nestjs/common';
import { CreateComicfollowerDto } from './dto/create-comicfollower.dto';
import { UpdateComicfollowerDto } from './dto/update-comicfollower.dto';

@Injectable()
export class ComicfollowersService {
  create(createComicfollowerDto: CreateComicfollowerDto) {
    return 'This action adds a new comicfollower';
  }

  findAll() {
    return `This action returns all comicfollowers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comicfollower`;
  }

  update(id: number, updateComicfollowerDto: UpdateComicfollowerDto) {
    return `This action updates a #${id} comicfollower`;
  }

  remove(id: number) {
    return `This action removes a #${id} comicfollower`;
  }
}
