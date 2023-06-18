import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { ReviewModel } from './model/review.model';

@Controller('review')
export class ReviewController {
	@Get('byProduct/:prodId')
	async get(@Param('prodId') prodId: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {}
}
