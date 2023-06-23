import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';

import { ProductModel } from '../../product/model/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({ timestamps: true })
export class ReviewModel {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	descrption: string;

	@Prop({ required: true })
	rating: number;

	@Prop({ type: MSchema.Types.ObjectId, ref: ProductModel.name })
	prodId: ProductModel;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
