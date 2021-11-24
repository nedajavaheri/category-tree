import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { CategoryService } from './service/category/category.service';

@Module({
  controllers: [ControllerController],
  providers: [CategoryService]
})
export class CategoryModule {}
