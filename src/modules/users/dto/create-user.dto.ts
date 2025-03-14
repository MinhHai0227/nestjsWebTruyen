import { users_role } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsOptional()
    username: string;

    @MinLength(6,{
        message:"Mật khẩu phải có ít nhất 6 kí tự"
    })
    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    password: string;

    @IsNotEmpty({message: "Email không được để trống"})
    @IsEmail({},{message: "Email không đúng định dạng"})
    email: string;

    @IsOptional()
    @Transform(({value}) => value ?? users_role.user)
    role: users_role;

    @IsOptional()
    cover_image?: string;

    @IsOptional()
    @Transform(({value}) => parseInt(value) || 0)
    @IsInt()
    total_coins: number;
}
