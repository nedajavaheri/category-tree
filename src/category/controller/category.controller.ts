import { CategoryDto } from '../dto';
import { CategoryService } from '../service';
import { Controller, Get, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }
    @Post()
    create(@Body() category: CategoryDto): Promise<CategoryDto> {
        return this.categoryService.create(category);
    }

    @Get()
    async findAll(): Promise<CategoryDto[]> {
        return this.categoryService.find();
    }
}
