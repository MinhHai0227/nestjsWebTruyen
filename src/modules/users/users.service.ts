import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordwordService } from 'src/helpers/pasword.service';
import { Prisma, users, users_role } from '@prisma/client';
import { PaninationService } from 'src/helpers/panination.service';
import { CreateRegisterDto } from 'src/auth/dto/create-register.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordwordService,
    private readonly paninationService: PaninationService,
  ) {}

  async findUserByEmail(email: string): Promise<users | null> {
    return await this.prisma.users.findUnique({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<users | null> {
    const exisEmail = await this.findUserByEmail(createUserDto.email);
    if (exisEmail) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const hashpassword = await this.passwordService.hasdPassword(
      createUserDto.password,
    );
    const newUser = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashpassword,
      },
    });

    return newUser;
  }

  async findAll(
    page: number,
    limit: number,
    role?: users_role,
  ): Promise<{
    data: Omit<users, 'password' | 'created_at'>[];
    totalPage: number;
    currenPage: number;
    nextPage: number;
    prevPage: number;
  }> {
    const { skip, take } = this.paninationService.calcPanination(page, limit);
    const filter = role ? { role } : {};

    const [users, totaluser] = await Promise.all([
      this.prisma.users.findMany({
        skip,
        take,
        where: filter,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          user_id: true,
          username: true,
          email: true,
          role: true,
          cover_image: true,
          total_coins: true,
        },
      }),
      this.prisma.users.count({
        where: filter,
      }),
    ]);

    const totalPage = this.paninationService.calcTotalPage(totaluser, limit);
    const nextPage = this.paninationService.nextPage(page, totalPage);
    const prevPage = this.paninationService.prevPage(page);
    const currenPage = page;

    return {
      data: users,
      totalPage,
      nextPage,
      prevPage,
      currenPage,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<users> {
    await this.exisuser(id);

    const updateUser = await this.prisma.users.update({
      where: { user_id: id },
      data: updateUserDto,
    });

    return updateUser;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.exisuser(id);

    await this.prisma.users.delete({
      where: { user_id: id },
    });

    return { message: `User với ID đã được xóa thành công` };
  }

  async handRegister(createRegisterDto: CreateRegisterDto) {
    const { username, email, password } = createRegisterDto;
    const exisEmail = await this.findUserByEmail(email);
    if (exisEmail) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const hashpassword = await this.passwordService.hasdPassword(password);
    const newUser = await this.prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hashpassword,
      },
    });

    const { password: _, ...userWithnoPass } = newUser;

    return userWithnoPass;
  }

  async exisuser(user_id: number) {
    const user = await this.prisma.users.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new NotFoundException('User with id not found');
    }

    return user;
  }

  async updateTotal(id: number, total: number) {
    const user = await this.exisuser(id);

    if ((user.total_coins ?? 0) < total) {
      throw new HttpException('User không đủ xu', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.prisma.users.update({
      where: { user_id: id },
      data: {
        total_coins: {
          decrement: total,
        },
      },
    });

    return updatedUser;
  }

  async findOne(user_id: number) {
    await this.exisuser(user_id);

    return await this.prisma.users.findUnique({
      where: { user_id: user_id },
    });
  }

  async uploadAvatar(user_id: number, file: Express.Multer.File) {
    await this.exisuser(user_id);
    return await this.prisma.users.update({
      where: { user_id: user_id },
      data: {
        cover_image: `http://localhost:3000/uploads/avatar/${file.filename}`,
      },
    });
  }


}
