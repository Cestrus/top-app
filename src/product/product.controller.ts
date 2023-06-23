import {
	Body,
	Controller,
	Post,
	Delete,
	Param,
	Patch,
	Get,
	Inject,
	HttpException,
	HttpStatus,
	HttpCode,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { ProductModel } from './model/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.constans';
import { FindProductDto } from './dto/find-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('product')
export class ProductController {
	constructor(@Inject(ProductService) private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const result = await this.productService.delete(id);
		if (!result) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const product = await this.productService.update(id, dto);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		const product = await this.productService.findWithReview(dto);
		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return product;
	}
}
