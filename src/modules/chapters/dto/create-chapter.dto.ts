import { Transform, Type } from "class-transformer";
import {  IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChapterDto {
    @IsInt()
    @IsNotEmpty({message: 'Comic không được bỏ trống'})
    @Transform(({value}) => parseInt(value,10))
    comic_id: number;

    @IsString()
    title: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsBoolean()
    is_locked: boolean;

    @IsOptional()
    @IsInt()
    price_xu: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    auto_unlock_time: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    created_at: Date
}
