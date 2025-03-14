import { IsDate, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateChapterunlockDto {

    @IsInt()
    @IsNotEmpty({message: 'User không được để trông'})
    user_id :    number;

    @IsInt()
    @IsNotEmpty({message: 'Chapter không được để trông'})    
    chapter_id :  number;

    @IsDate()
    @IsOptional()
    unlock_time : Date;
}
