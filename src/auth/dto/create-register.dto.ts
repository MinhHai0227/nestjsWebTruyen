import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class CreateRegisterDto{

    @IsOptional()
    username: string

    @IsNotEmpty({message: "Email không được để trống"})
    @IsEmail({},{message: "Email không đúng định dạng"})
    email: string

    @IsNotEmpty({message: "Mật khảu không được để trống"})
    @MinLength(6,{
            message:"Mật khẩu phải có ít nhất 6 kí tự"
        })
    password: string
}