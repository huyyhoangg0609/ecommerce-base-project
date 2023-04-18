import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async register(body: RegisterDto) {
        
    }
}
