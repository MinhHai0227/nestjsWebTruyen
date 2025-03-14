import { PartialType } from '@nestjs/mapped-types';
import { CreateComicfollowerDto } from './create-comicfollower.dto';

export class UpdateComicfollowerDto extends PartialType(CreateComicfollowerDto) {}
