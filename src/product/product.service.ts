import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductDocument, ProductModel } from './model/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/model/review.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name) private readonly productModel: Model<ProductDocument>,
	) {}

	async create(dto: CreateProductDto) {
		return await this.productModel.create(dto);
	}

	async findById(id: string) {
		return await this.productModel.findById(id).exec();
	}

	async delete(id: string) {
		return await this.productModel.deleteOne({ _id: id }).exec();
	}

	async update(id: string, dto: CreateProductDto) {
		return await this.productModel.findOneAndUpdate({ _id: id }, dto, { new: true }).exec();
	}

	async findWithReview(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviews',
						localField: '_id',
						foreignField: 'prodId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: {
							$size: '$reviews',
						},
						reviewAvg: {
							$avg: '$reviews.rating',
						},
					},
				},
			])
			.exec()) as (ProductModel & {
			review: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}
