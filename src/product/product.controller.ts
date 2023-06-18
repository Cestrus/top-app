import { Body, Controller, Post, Delete, Param, Patch, Get } from '@nestjs/common';
import { ProductModel } from './model/product.model';

@Controller('product')
export class ProductController {
	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ProductModel) {}
}
