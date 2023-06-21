import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const prodId = new Types.ObjectId().toHexString();
const prodId_fail = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	descrption: 'Description',
	rating: 5,
	product: prodId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - rating fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400);
	});

	it('/review/create (POST) - descrption fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, descrption: 0 })
			.expect(400);
	});

	it('/review/byProduct/:prodId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${prodId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:prodId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${prodId_fail}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${prodId_fail}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND });
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer()).delete(`/review/${createdId}`).expect(200);
	});

	afterAll(() => {
		disconnect();
	});
});
