import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';

@Controller('auth')
export class AuthController {
	constructor(@Inject(AuthService) private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const user = await this.authService.findUser(dto.email);
		if (user) {
			throw new HttpException(ALREADY_REGISTERED_ERROR, HttpStatus.BAD_REQUEST);
		}
		return await this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const { email } = await this.authService.validateUser(dto);
		return await this.authService.login(email);
	}
}
