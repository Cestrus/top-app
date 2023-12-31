import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import { TopPageModel, TopPageSchema } from './model/top-page.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TopPageModel.name, schema: TopPageSchema, collection: 'page' },
		]),
	],
	controllers: [TopPageController],
	providers: [TopPageService],
})
export class TopPageModule {}
