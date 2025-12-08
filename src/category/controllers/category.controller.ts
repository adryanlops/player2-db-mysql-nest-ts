import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../entities/category.entity";
import { DeleteResult } from "typeorm";


@Controller("/categories")
export class CategoryContoller{
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Category[]>{
        return this.categoryService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Category>{
        return this.categoryService.findById(id)
    }

    @Get("/descricao/:description")
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param("description") description: string): Promise<Category[]>{
        return this.categoryService.findByDescription(description)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() category: Category): Promise<Category>{
        return this.categoryService.create(category)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() category: Category): Promise<Category>{
        return this.categoryService.update(category)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult>{
        return this.categoryService.delete(id)
    }
}