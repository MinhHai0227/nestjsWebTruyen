import { PartialType } from '@nestjs/mapped-types';
import { CreateComicreadhistoryDto } from './create-comicreadhistory.dto';

export class UpdateComicreadhistoryDto extends PartialType(CreateComicreadhistoryDto) {}
