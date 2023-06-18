import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument, ReviewModel } from './model/review.model';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private reviweModel: Model<ReviewDocument>) {}
}
