import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsDate()
    created_at: Date;
}
