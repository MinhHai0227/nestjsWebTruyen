import { comics_status } from "@prisma/client";
import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateComicDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsEnum(comics_status)
  status: comics_status = comics_status.DANG_RA;

  @IsOptional()
  @IsString()
  cover_image: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  country_id: number;

  @IsOptional()
  @IsInt()
  views: number;

  @IsOptional()
  @IsInt()
  likes: number;

  @IsArray({ message: "Phải là 1 mảng" })
  @ArrayNotEmpty({ message: "Category không được trống" })
  @IsInt({ each: true, message: 'Phải là số nguyên' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10)); 
    }
    return value;
  })
  categoryIds: number[];
  

}
