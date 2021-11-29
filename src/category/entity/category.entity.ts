import { Entity, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, Tree } from "typeorm";

@Entity('categories')
@Tree("closure-table")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

    constructor(name: string, parent?: Category);
    constructor(name: string, parent: Category);
    constructor(name?: string, parent?: Category) {
        this.name = name || '';
        this.parent = parent || undefined;
    }
}
