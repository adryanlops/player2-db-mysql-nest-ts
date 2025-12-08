import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



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
}