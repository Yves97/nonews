import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles, RolesGuard } from 'src/user/roles.guards';
import { UserRole } from 'src/user/user.role.enum';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ){}

    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard(), RolesGuard)
    @Post()
    async createCategory(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto): Promise<Category>{
        return await this.categoryService.createCategory(createCategoryDto)
    }

    @Get('categories')
    async categories(): Promise<Category[]>{
        return await this.categoryService.getCategories()
    }

    @Get(':id')
    async category(@Param('id') id: number): Promise<Category>{
        return await this.categoryService.category(id)
    }

    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthGuard(),RolesGuard)
    @Patch(':id')
    async update(@Param('id') id: number, @Body() categoryDto: CreateCategoryDto){
        return await this.categoryService.update(id,categoryDto)
    }
}



