import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from '../dto';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async create(categoryDto: CategoryDto): Promise<CategoryDto> {
        try {

            const category = await this.categoryRepository.create(categoryDto);
            if (categoryDto.parent_id) {
                const rootCategory = await this.categoryRepository.findOne(categoryDto.parent_id);
                category.parent = rootCategory;
                const result = await this.categoryRepository.save(category);
                return new CategoryDto(result.id, result.name, result.parent.id);
            } else {
                const result = await this.categoryRepository.save(category);
                return new CategoryDto(result.id, result.name);
            }

        } catch (error) {

        }

    }
    async find(): Promise<CategoryDto[]> {
        return (await this.categoryRepository.find()).map(x => {
            let item = x.parent ? new CategoryDto(x.id, x.name, x.parent.id) : new CategoryDto(x.id, x.name);
            return item;
        });
    }
    async findOne(id: number): Promise<CategoryDto> {
        const result = await this.categoryRepository.findOne(id);
        return result.parent ? new CategoryDto(result.id, result.name, result.parent.id) : new CategoryDto(result.id, result.name);
    }
    async findOneByName(name: string): Promise<CategoryDto> {
        const result = await this.categoryRepository.findOne(name);
        return result.parent ? new CategoryDto(result.id, result.name, result.parent.id) : new CategoryDto(result.id, result.name);
    }
    async delete(id: number) {
        return this.categoryRepository.delete(id);
    }

}
