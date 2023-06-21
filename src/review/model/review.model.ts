import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { ProductModel } from '../../product/model/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	descrption: string;

	@Prop({ required: true })
	rating: number;

	@Prop({ type: Types.ObjectId, ref: ProductModel.name })
	product: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
