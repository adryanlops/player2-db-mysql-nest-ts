import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { DeleteResult } from "typeorm/browser";


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>

    ){ }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({
            relations: {
                products: true
            }
        });
    }

    async findById(id: number): Promise<Category> {
        let category = await this.categoryRepository.findOne({
            where: {
                id
            },
            relations: {
                products: true
            }
        });

        if (!category) {
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND);
        }

        return category;
        
    }

    async findByDescription(description: string): Promise<Category[]> {
        return await this.categoryRepository.find({
            where: {
                description: ILike(`%${description}%`)
            },
            relations: {
                products: true
            }
        });
    }

    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async update(category: Category): Promise<Category> {
        await this.findById(category.id);

        return await this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.categoryRepository.delete(id);
    }
}