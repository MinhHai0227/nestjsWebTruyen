import { PartialType } from '@nestjs/mapped-types';
import { CreateChapterunlockDto } from './create-chapterunlock.dto';

export class UpdateChapterunlockDto extends PartialType(CreateChapterunlockDto) {}
