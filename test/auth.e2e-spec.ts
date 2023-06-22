import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect } from 'mongoose';

import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { INCORRECT_INPUT_DATA } from '../src/auth/auth.constants';

const testSuccessLoginDto: AuthDto = {
	email: 'a1@a.co',
	password: 'qwer',
};

const testFailLoginDto: AuthDto = {
	email: 'a@a.co',
	password: 'qwer',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(testSuccessLoginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(testFailLoginDto)
			.expect(401, { statusCode: 401, message: INCORRECT_INPUT_DATA });
	});

	afterAll(() => {
		disconnect();
	});
});
