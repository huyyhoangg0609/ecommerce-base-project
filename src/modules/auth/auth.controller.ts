/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Post, Get, Body, Query, Param, Req, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signup(@Body() body: RegisterDto) {
        return this.authService.signup(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        console.log(req.user.accountId);
        return this.authService.logout(req.user.accountId);
    }






}
