import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository
    ){}

    async createCategory(categoryDto: CreateCategoryDto): Promise<Category>{
    
        const category = new Category()
        category.title = categoryDto.title
        category.slug = categoryDto.slug
        category.content = categoryDto.content
        
        const create = await this.categoryRepository.create(category)
        try {
            await this.categoryRepository.save(category)
            return create;
        } catch (error) {
            if(error.code === "23505"){
                throw new ConflictException('Categorie e deja existante')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }

    async getCategories(): Promise<Category[]>{
        const categories = await this.categoryRepository.find()
        return categories;
    }
    
    async category(id: number): Promise<Category>{
        const category = await this.categoryRepository.findOne(id)
        if(!category){
            throw new NotFoundException('Category introuvable')
        }
        return category
    }

    async update(id: number,categoryDto: CreateCategoryDto){
        const getCategory = await this.category(id)
        const update = await this.categoryRepository.update(id,categoryDto)
        return update
    }
}
