import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument, ReviewModel } from './model/review.model';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviweModel: Model<ReviewDocument>) {}

	async create(dto: CreateReviewDto) {
		const newReview = await this.reviweModel.create(dto);
		newReview.save();
		return newReview;
	}

	async deleteById(id: string) {
		return await this.reviweModel.findOneAndDelete({ id }).exec();
	}

	async deleteByProdId(prodId: string) {
		return await this.reviweModel.deleteMany({ prodId }).exec();
	}

	async findByProdId(prodId: string) {
		return await this.reviweModel.find({ product: prodId }).exec();
	}
}
