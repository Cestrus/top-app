import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	@Post('login')
	async login(@Body() dto: AuthDto) {}

	@Post('register')
	async register(@Body() dto: AuthDto) {}
}
