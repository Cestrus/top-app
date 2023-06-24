import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TopLevelCategory, TopPageDocument, TopPageModel } from './model/top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>,
	) {}

	async create(dto: CreateTopPageDto) {
		return await this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return await this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return await this.topPageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return await this.topPageModel
			.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
			.exec();
	}

	async delete(id: string) {
		return await this.topPageModel.findByIdAndDelete(id).exec();
	}

	async update(id: string, dto: CreateTopPageDto) {
		return await this.topPageModel.findOneAndUpdate({ _id: id }, dto, { new: true }).exec();
	}
}
