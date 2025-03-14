import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterimageDto } from './create-chapterimage.dto';

export class UpdateChapterimageDto extends PartialType(CreateChapterimageDto) {}
