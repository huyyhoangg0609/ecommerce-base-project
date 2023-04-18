import { Controller, Post, Get, Body, Query, Param, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('register')
    async registerAccount(@Body() body: RegisterDto) {
        return await this.authService.register(body);
    }





}
