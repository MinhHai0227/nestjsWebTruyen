import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './pasport/local-auth.guard';
import { Public } from 'src/decorator/setpublic';
import { CreateRegisterDto } from './dto/create-register.dto';




@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body()createRegisterDto: CreateRegisterDto){
    return this.authService.register(createRegisterDto);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() req){
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    console.log('User from request:', req.user);
    return req.user;
  }
}
