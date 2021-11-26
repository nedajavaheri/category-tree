import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controller/category.controller';
import { Category } from './entity/category.entity';
import { CategorySeed } from './seeds/category.seed';
import { CategoryService } from './service/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategorySeed]
})
export class CategoryModule { }
