import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";



@Entity({ name: "tb_product" })
export class Product{ 

    @PrimaryGeneratedColumn()
    id: number;
    
    @IsNotEmpty()
    @Column({ type: "varchar", length: 100 })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Column({ type: "decimal" })
    price: number;

    @IsNotEmpty()
    @Column({ type: "varchar", length: 500 })
    description: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}