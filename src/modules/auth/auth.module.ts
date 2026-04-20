import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret@123',
            signOptions: { expiresIn: '1d' },
        }),
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        JwtStrategy,
        AuthService
    ],
})
export class AuthModule {}
