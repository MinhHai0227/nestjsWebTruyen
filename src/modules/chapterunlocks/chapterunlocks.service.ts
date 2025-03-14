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

  create(createChapterunlockDto: CreateChapterunlockDto) {
    return 'This action adds a new chapterunlock';
  }

  findAll() {
    return `This action returns all chapterunlocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapterunlock`;
  }

  update(id: number, updateChapterunlockDto: UpdateChapterunlockDto) {
    return `This action updates a #${id} chapterunlock`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapterunlock`;
  }

  async unlockChapterForUser(user_id: number, chapter_id: number){

    const chapter = await this.chapterService.exisChapter(chapter_id);
    const user = await this.userService.exisuser(user_id);

    const currentTime = new Date();
    const isBeforUnlock = chapter.auto_unlock_time && chapter.auto_unlock_time > currentTime;

    if(isBeforUnlock){
      await this.userService.updateTotal(user_id,chapter.price_xu ?? 0)
    }

    console.log('check user xu >>>>', user?.total_coins)
    console.log('check chapter xu >>>>', chapter.price_xu)

    await this.chapterService.updateUnlockChapter(chapter_id,false)
    await this.notificationService.notifiUnlock(user_id,chapter.title)
    await this.prisma.chapter_unlocks.create({
      data: {
        user_id: user_id,
        chapter_id: chapter_id,
        unlock_time: currentTime
      }
    })
    return {message: 'Mở hóa thành công'}
  }
}
