import { Injectable } from '@nestjs/common';
import { CreateComicreadhistoryDto } from './dto/create-comicreadhistory.dto';
import { UpdateComicreadhistoryDto } from './dto/update-comicreadhistory.dto';

@Injectable()
export class ComicreadhistoryService {
  create(createComicreadhistoryDto: CreateComicreadhistoryDto) {
    return 'This action adds a new comicreadhistory';
  }

  findAll() {
    return `This action returns all comicreadhistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comicreadhistory`;
  }

  update(id: number, updateComicreadhistoryDto: UpdateComicreadhistoryDto) {
    return `This action updates a #${id} comicreadhistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} comicreadhistory`;
  }
}
