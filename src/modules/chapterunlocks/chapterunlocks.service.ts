import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChapterunlockDto } from './dto/create-chapterunlock.dto';
import { UpdateChapterunlockDto } from './dto/update-chapterunlock.dto';
import { UsersService } from '../users/users.service';
import { ChaptersService } from '../chapters/chapters.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ChapterunlocksService {

  constructor(
    private readonly userService: UsersService,
    private readonly chapterService: ChaptersService,
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationsService,
  ){}


  async exisUserUnlock(user_id: number, chapter_id: number){

    const chapter = await this.chapterService.exisChapter(chapter_id);
    const user = await this.userService.exisuser(user_id);

    const userUnlock = await this.prisma.chapter_unlocks.findFirst({
      where: {
        chapter_id: chapter.chapter_id,
        user_id: user.user_id,
      }
    })

    return !!userUnlock;
  }

  async userHasUnlock(user_id: number, chapter_id: number){

    const chapter = await this.chapterService.exisChapter(chapter_id);
    const user = await this.userService.exisuser(user_id);

    const currentTime = new Date();
    const isBeforUnlock = chapter.auto_unlock_time && chapter.auto_unlock_time > currentTime;

    if(!isBeforUnlock){
      throw new HttpException('Chapter đã được mở khóa tự động', HttpStatus.BAD_REQUEST)
    }

    const userUnlock = await this.exisUserUnlock(user.user_id, chapter.chapter_id)

    if(userUnlock === true){
      throw new HttpException('Bạn đã mở khóa chapter này', HttpStatus.BAD_REQUEST)
    }

    return {message: "Bạn phải mở khóa hoặc tới ngày unlock mới đọc được"}
  }

  async unlockChapterForUser(user_id: number, chapter_id: number){

    const chapter = await this.chapterService.exisChapter(chapter_id);
    const user = await this.userService.exisuser(user_id);

    await this.userHasUnlock(user.user_id,chapter.chapter_id);

    await this.userService.updateTotal(user.user_id,chapter.price_xu ?? 0)
    await this.notificationService.notifiUnlock(user.user_id,chapter.title)
    await this.prisma.chapter_unlocks.create({
      data: {
        user_id: user_id,
        chapter_id: chapter_id,
      }
    })
    return {message: 'Mở hóa thành công'}
  }
}
