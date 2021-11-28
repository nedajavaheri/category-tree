import { CategoryDto } from '../dto';
import { CategoryService } from '../service';
import { Controller, Get, Post, Query, Delete, Param } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';


@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }
    @Post()
    create(@Body() category: CategoryDto): Promise<CategoryDto> {
        return this.categoryService.create(category);
    }

    @Get()
    async find(@Query('id') id: number) {
        if (id)
            return this.categoryService.findByParentId(id);
        return this.categoryService.find();
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.categoryService.delete(id);
    }

}
