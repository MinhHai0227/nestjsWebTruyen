import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChapterimageDto {

    @IsInt()
    @IsNotEmpty({message: 'Chapter không được bỏ trống'})
    @Transform(({value}) => parseInt(value,10))
    chapter_id: number;
  
    @IsString()
    @IsNotEmpty()
    image_url: string;  
  
    @IsOptional()
    created_at: Date; 
}
