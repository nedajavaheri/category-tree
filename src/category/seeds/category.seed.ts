

import { Injectable } from "@nestjs/common";
import { Command } from 'nestjs-command';
import { CategoryDto } from '../dto';
import { CategoryService } from "../service";
import { categories as categories_to_seed } from './category.data';
@Injectable()
export class CategorySeed {
    constructor(private categoryService: CategoryService) {

    }
    @Command({ command: 'create:category', describe: 'Create the categories' })
    async create() {
        const categories = await this.seedCategories(categories_to_seed);
        console.log(categories);
    }
    private async seedCategories(categories_to_seed: CategoryDto[]): Promise<CategoryDto[]> {
        let categories: CategoryDto[] = [];
        for (let category_to_seed of categories_to_seed) {
            const existCategory = await this.categoryService.findOneByName(category_to_seed.name);
            if (existCategory)
                this.categoryService.delete(existCategory.id);
            const category = await this.categoryService.create(category_to_seed);
            categories.push(category);
        }

        return categories;
    }
}