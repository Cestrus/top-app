import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserDocument, UserModel } from './model/user.model';
import { AuthDto } from './dto/auth.dto';
import { INCORRECT_INPUT_DATA } from './auth.constants';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
		private configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async createUser({ email, password }: AuthDto): Promise<UserModel> {
		const passwordHash = await hash(password, Number(this.configService.get<number>('SALT')));
		const newUser = new this.userModel({ email, passwordHash });
		return newUser.save();
	}

	async findUser(email: string): Promise<UserDocument | null> {
		return await this.userModel.findOne({ email }).exec();
	}

	async validateUser({ email, password }: AuthDto): Promise<Pick<UserModel, 'email'>> {
		const user = await this.userModel.findOne({ email }).exec();
		if (!user) {
			throw new HttpException(INCORRECT_INPUT_DATA, HttpStatus.UNAUTHORIZED);
		}
		const isValidPassword = await compare(password, user.passwordHash);
		if (!isValidPassword) {
			throw new HttpException(INCORRECT_INPUT_DATA, HttpStatus.UNAUTHORIZED);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		const access_token = await this.jwtService.signAsync(payload);
		return {
			access_token,
		};
	}
}
