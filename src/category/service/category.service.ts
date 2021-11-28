import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CategoryDto } from '../dto';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Category) private categoryTreeRepository: TreeRepository<Category>) { }

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
        return (await this.categoryTreeRepository.findTrees());
    }

    async findByParentId(id: number): Promise<CategoryDto> {
        let rootCategory = await this.categoryRepository.findOne(id);
        return (await this.categoryTreeRepository.findDescendantsTree(rootCategory));
    }

    async delete(id: number) {
        await this.categoryRepository.delete(id);
    }

}
