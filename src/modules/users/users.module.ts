import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordwordService } from 'src/helpers/pasword.service';
import { PaninationService } from 'src/helpers/panination.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService,PasswordwordService,PaninationService],
  exports: [UsersService]
})
export class UsersModule {}
