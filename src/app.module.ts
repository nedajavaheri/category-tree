import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [CategoryModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: '123456',
    database: 'app_db',
    entities: [__dirname + '/**/*.entity.{ts,js}'],
    synchronize: true,
    autoLoadEntities: true,
    keepConnectionAlive: true,
    logging: true,
    connectTimeout: 30000
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
