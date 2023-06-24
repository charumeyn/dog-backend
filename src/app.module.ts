import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { SheltersModule } from './shelters/shelters.module';
import { FundraisersModule } from './fundraisers/fundraisers.module';
import { AddressesModule } from './addresses/addresses.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { UserAuthModule } from './user-auth/user-auth.module';
import { CommentsModule } from './comments/comments.module';
import { DonationsModule } from './donations/donations.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [DogsModule, SheltersModule, FundraisersModule, AddressesModule, PostsModule, TypeOrmModule.forRoot({
    ...dataSourceOptions,
    autoLoadEntities: true,
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true,
  }), UserAuthModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    CommentsModule,
    DonationsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
