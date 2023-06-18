import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthModel, AuthSchema } from './model/auth.model';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema, collection: 'users' }]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
