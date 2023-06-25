import {
	Body,
	Controller,
	Post,
	Delete,
	Param,
	Patch,
	Get,
	HttpCode,
	Inject,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';

import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { PAGE_NOT_FOUND_ERROR } from './top-page-constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(@Inject(TopPageService) private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);
		if (!page) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return page;
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);
		if (!page) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const result = await this.topPageService.delete(id);
		if (!result) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const page = await this.topPageService.update(id, dto);
		if (!page) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
		return page;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return await this.topPageService.findByCategory(dto.firstCategory);
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return await this.topPageService.findByText(text);
	}
}
