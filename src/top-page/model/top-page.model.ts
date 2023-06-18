import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Items,
}

class HhData {
	@Prop()
	count: number;

	@Prop()
	junoirSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

class AdvantageData {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema()
export class TopPageModel {
	@Prop({ required: true, enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop({ required: true })
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop({ required: true })
	title: string;

	@Prop()
	category: string;

	@Prop()
	hh?: HhData;

	@Prop([AdvantageData])
	advantages: AdvantageData[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
