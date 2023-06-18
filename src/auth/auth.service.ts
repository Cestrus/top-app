import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthDocument, AuthModel } from './model/auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
	) // @Inject() private configService: ConfigService,
	{}

	async create({ email, password }: AuthDto): Promise<AuthModel> {
		// const passwordHash = await bcrypt.hash(password, this.configService.get('SALT'));
		const user = new this.authModel({ email, passwordHash: password });
		return user.save();
	}
}
