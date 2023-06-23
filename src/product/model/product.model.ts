import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema({ timestamps: true })
export class ProductModel {
	@Prop()
	image: string;

	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	price: number;

	@Prop()
	oldPrice?: number;

	@Prop()
	credit: number;

	@Prop({ required: true })
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop()
	tags: string[];

	@Prop([ProductCharacteristic])
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
