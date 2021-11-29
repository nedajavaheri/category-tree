import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CategoryDto } from '../dto';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: TreeRepository<Category>) { }

    async insertOne(categoryDto: CategoryDto): Promise<Category> {
        try {

            const category = await this.categoryRepository.create(categoryDto);
            if (categoryDto.parent_id) {
                const rootCategory = await this.categoryRepository.findOne(categoryDto.parent_id);
                category.parent = rootCategory;
                return await this.categoryRepository.save(category);
            } else {
                return await this.categoryRepository.save(category);
            }

        } catch (error) {

        }

    }

    async getList(): Promise<Category[]> {
        return (await this.categoryRepository.findTrees());
    }

    async getOne(name: string): Promise<Category> {
        return await this.categoryRepository.findOne(name);
    }

    async getListByParentId(id: number): Promise<Category> {
        let rootCategory = await this.categoryRepository.findOne(id);
        return await this.categoryRepository.findAncestorsTree(rootCategory);
    }

    async deleteOne(id: number): Promise<{ deleted: boolean; message?: string }> {
        try {
            await this.categoryRepository.delete({ id });
            return { deleted: true };
        } catch (err) {
            return { deleted: false, message: err.message };
        }
    }

}
