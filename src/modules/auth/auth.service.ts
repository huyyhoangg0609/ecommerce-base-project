/* eslint-disable @typescript-eslint/no-empty-function */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { AuthStatus } from 'src/common/enum/auth.enum';
import { Account } from './entities/account.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService    
    ) { }

    async signup(body: RegisterDto) {
        // STEP 1: Check existed username
        const existedAccount = await this.checkExistedUsername(body.username);
        if (existedAccount) {
            throw new BadRequestException(AuthStatus.EXISTED_USERNAME);
        }
        // STEP 2: Hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(body.password, salt);
        // STEP 3: Create new account
        const newDate = new Date().toLocaleString('en-US', {
            timeZone: 'Pacific/Kiritimati'
        });
        await this.authRepository.create({ 
            username: body.username,
            password: hashPassword,
            role: body.role,
            updatedAt: newDate+ ""
        });
        return { statusCode: HttpStatus.CREATED, message: AuthStatus.CREATED };
    }
    
    async login(body: LoginDto) {
        // STEP 1: Check existed username
        const account = await this.checkExistedUsername(body.username);
        if (!account) {
            throw new BadRequestException(AuthStatus.WRONG_USERNAME_OR_PASSWORD);
        }
        // STEP 2: Check password
        const isMatch = await bcrypt.compare(body.password, account.password);
        if (!isMatch) {
            throw new BadRequestException(AuthStatus.WRONG_USERNAME_OR_PASSWORD);
        }
        // STEP 3: Generate tokens
        const tokens = await this.generateTokens(account.id, account.role);
        // STEP 4: Update refresh token in DB
        await this.authRepository.updateRefreshToken(account.id, tokens.refresh_token);
        // STEP 5: Return access_token and refresh_token
        return { 
            statusCode: HttpStatus.OK, 
            result: {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token
            }
        };
    }

    async checkExistedUsername(username: string): Promise<Account> {
        return this.authRepository.findOne({ where: { username }});
    }

    async generateTokens(accountId: string, role: string) {
        const [access_token, refresh_token] = await Promise.all ([
            this.jwtService.signAsync(
                { payload: { accountId, role }},
                { secret: process.env.JWT_SECRET, expiresIn: '15m' }
            ),
            this.jwtService.signAsync(
                { payload: { accountId, role }},
                { secret: process.env.JWT_SECRET, expiresIn: '7d' }
            )
        ]);
        return { access_token, refresh_token }
    }

    async logout(id: string) {
        await this.authRepository.updateRefreshToken(id, null);
        return { statusCode: HttpStatus.OK, message: AuthStatus.LOGOUT };
    }

    async isExistedRefreshToken(id: string) {
        return await this.authRepository.getRefreshTokenById(id);
    }

}
