import { ConfigService } from './../config/config.service';
import { UsersModule } from './../users/users.module';
import { ConfigModule } from './../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
            UsersModule,
            ConfigModule,
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
            secret: configService.jwtSecret,
            signOptions: {
            expiresIn: configService.jwtExpireTime,
        },
      }),
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, PassportModule]
})
export class AuthModule {}
