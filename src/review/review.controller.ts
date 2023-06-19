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

@Controller('review')
export class ReviewController {
	constructor(@Inject(ReviewService) private readonly reviewService: ReviewService) {}

	@Get('byProduct/:prodId')
	async get(@Param('prodId') prodId: string) {
		return await this.reviewService.findByProdId(prodId);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const doc = await this.reviewService.delete(id);
		if (!doc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto);
	}
}
