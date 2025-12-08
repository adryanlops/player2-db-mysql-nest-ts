import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm/browser";
import { CategoryService } from "../../category/services/category.service";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private categoryService: CategoryService
    ){}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations:{ category: true }
        });
    }

    async findById(id: number): Promise<Product> {
        let product = await this.productRepository.findOne({ 
            where: { id },
            relations: { category: true }
        });

        if (!product) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async findAllByName(name: string): Promise<Product[]> {
        return await this.productRepository.find({
            where: { name: ILike(`%${name}%`) },
            relations: { category: true }
        });
    }

    async create(product: Product): Promise<Product> {
        if(product.category){
            let category = await this.categoryService.findById(product.category.id)

            if(!category){
                throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND)
            }
        }

        return await this.productRepository.save(product)
    }

    async update(product: Product): Promise<Product> {
        let foundProduct = await this.findById(product.id);

        if (!foundProduct || !product.id) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        if(product.category){
            let category = await this.categoryService.findById(product.category.id)

            if(!category){
                throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND)
            }
        }

        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<DeleteResult> {
        let foundProduct = await this.findById(id);

        if (!foundProduct) {
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        }

        return await this.productRepository.delete(id);
    }
    
}