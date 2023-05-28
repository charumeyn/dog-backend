import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { Address } from './entities/address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user-auth/user/user.module';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { AuthModule } from 'src/user-auth/user/auth/auth.module';
import { UserService } from 'src/user-auth/user/user.service';
import { User } from 'src/user-auth/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule { }
