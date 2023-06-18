import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductModel, ProductSchema } from './model/product.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ProductModel.name, schema: ProductSchema, collection: 'products' },
		]),
	],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
