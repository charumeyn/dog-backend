import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { User } from '../user.entity';
import { Shelter } from 'src/shelters/entities/shelter.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        // secret: config.get('JWT_KEY'),
        // signOptions: { expiresIn: config.get('JWT_EXPIRES') },
        secret: 'TEST_KEY',
        signOptions: { expiresIn: '365d' },
      }),
    }),
    TypeOrmModule.forFeature([User, Shelter]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
})
export class AuthModule { }