import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DivisionsModule } from './divisions/divisions.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { APP_GUARD } from '@nestjs/core';
import { AbilitiesGuard } from './ability/ability.gaurds';
import { FileStorageModule } from './file-storage/file-storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AboutModule } from './about/about.module';
import { ServicesModule } from './services/services.module';
import { ContactModule } from './contact/contact.module';
import { DepartmentsModule } from './departments/departments.module';
import { SliderModule } from './slider/slider.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_SERVER_HOST}/${process.env.MONGODB_DATABASE_NAME}`,
    ), // 'mongodb://192.168.122.185/nmrl_web
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist', 'nmrl-wbsite'),
    }),
    UsersModule,
    DivisionsModule,
    ArticlesModule,
    AuthModule,
    AbilityModule,
    FileStorageModule,
    AboutModule,
    ServicesModule,
    ContactModule,
    DepartmentsModule,
    SliderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AbilitiesGuard,
    // },
  ],
})
export class AppModule {}
