import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { notifications_type } from '@prisma/client';

@Injectable()
export class NotificationsService {

  constructor(private readonly prisma: PrismaService,){}
  
  async notifiUnlock(user_id: number, chapterTitle: string){
    const message = `Bạn đã mở khóa ${chapterTitle} thành công`
    
    return await this.prisma.notifications.create({
      data: {
        user_id: user_id,
        message: message,
        type: notifications_type.unlock,
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
