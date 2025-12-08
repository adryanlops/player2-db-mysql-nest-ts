import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";
import { DeleteResult } from "typeorm";


@Controller("/products")
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Product[]>{
        return this.productService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Product>{
        return this.productService.findById(id)
    }

    @Get("/nome/:name")
    @HttpCode(HttpStatus.OK)
    findAllByName(@Param('name') name: string): Promise<Product[]>{
        return this.productService.findAllByName(name)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() product: Product): Promise<Product> {
        return this.productService.update(product);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.productService.delete(id);
    }


}