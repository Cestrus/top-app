import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	descrption: string;

	@Max(5)
	@Min(1)
	@IsNumber()
	rating: number;

	@IsString()
	product: string;
}
