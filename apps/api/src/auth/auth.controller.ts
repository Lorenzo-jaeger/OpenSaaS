import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema } from '@opensaas/shared';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() data: any) {
        const validated = RegisterSchema.parse(data);
        return this.authService.register(validated);
    }

    @Post('login')
    async login(@Body() data: any) {
        const validated = LoginSchema.parse(data);
        return this.authService.login(validated);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async getMe(@User() user: any) {
        return user;
    }
}
