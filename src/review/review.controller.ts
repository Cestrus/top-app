import {
	Body,
	Controller,
	Post,
	Delete,
	Param,
	Get,
	Inject,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
	constructor(@Inject(ReviewService) private readonly reviewService: ReviewService) {}

	@Get('byProduct/:prodId')
	async get(@Param('prodId') prodId: string) {
		return await this.reviewService.findByProdId(prodId);
	}

	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		const doc = await this.reviewService.deleteById(id);
		if (!doc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Delete(':prodId')
	async deleteByProdId(@Param('prodId') prodId: string) {
		const docs = await this.reviewService.deleteByProdId(prodId);
		if (!docs) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto);
	}
}
