import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordwordService } from 'src/helpers/pasword.service';
import { UsersService } from 'src/modules/users/users.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly passwordService: PasswordwordService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, pass: string): Promise<any>{
        const user = await this.userService.findUserByEmail(email);
        if(!user || !user.password) return null;

        const isValidate = await this.passwordService.comparePassword(pass, user.password);

        if(!isValidate) return null;
        
        return user
    }

    async login(user: any) {
      const payload = { email: user.email, sub: user.user_id, role: user.role};
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async register(createRegisterDto: CreateRegisterDto){
      return this.userService.handRegister(createRegisterDto);
    }
}
