import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ChapterimagesModule } from './modules/chapterimages/chapterimages.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { ComicsModule } from './modules/comics/comics.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/pasport/jwt-auth.guard';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CountriesModule } from './modules/countries/countries.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ComicreadhistoryModule } from './modules/comicreadhistory/comicreadhistory.module';
import { ComicfollowersModule } from './modules/comicfollowers/comicfollowers.module';
import { ChapterunlocksModule } from './modules/chapterunlocks/chapterunlocks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    PrismaModule, 
    UsersModule, 
    CategoriesModule, 
    ChapterimagesModule, 
    ChaptersModule, 
    ComicsModule, 
    AuthModule,
    TransactionsModule,
    NotificationsModule,
    CountriesModule,
    CommentsModule,
    ComicreadhistoryModule,
    ComicfollowersModule,
    ChapterunlocksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
