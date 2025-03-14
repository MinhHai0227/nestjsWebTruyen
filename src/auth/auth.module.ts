import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordwordService } from 'src/helpers/pasword.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './pasport/local.strategy';
import { JwtStrategy } from './pasport/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService,PasswordwordService,LocalStrategy,JwtStrategy],
  imports:[
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
        },
      }),      
    }),
  ],
})
export class AuthModule {}
