import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users_role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/pasport/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/decorator/setpublic';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  findAll(
    @Query('role') role?: users_role,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    if (role && !Object.values(users_role).includes(role)) {
      throw new HttpException(
        'Invalid role. Role must be "user" or "admin".',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.findAll(page, limit, role);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Get('unlock')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req) {
    const user_id = req.user.userId;
    return this.usersService.findOne(user_id);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatar',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const ext = extname(file.originalname);
          const randomName = name + '-' + Date.now() + ext;
          callback(null, randomName);
        },
      }),
    }),
  )
  async uploadAvatar(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user_id = req.user.userId;

    if (!file) {
      throw new Error('No file uploaded!');
    }

    const updatedUser = await this.usersService.uploadAvatar(user_id, file);

    return {
      message: 'File uploaded successfully!',
      avatar: updatedUser.cover_image,
    };
  }
}
