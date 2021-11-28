import { IsNumber, IsString, IsOptional } from "class-validator";

export class CategoryDto {

    constructor(id: number, name: string, parent_id?: number) {
        this.id = id;
        this.name = name;
        if (parent_id)
            this.parent_id;
    }


    @IsNumber()
    readonly id?: number;

    @IsOptional()
    parent_id?: number;

    @IsString()
    name: string;


}
