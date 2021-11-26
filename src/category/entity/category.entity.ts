import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, TreeLevelColumn } from "typeorm";

@Entity('categories')
@Tree("closure-table")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;
}
