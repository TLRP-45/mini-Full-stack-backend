import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authservice: AuthService,
    ){}

    @Post('Register')
    register(@Body()registerDto: RegisterDto,){
        return this.authservice.register(registerDto);
    }


    @Post('Login')
    login(@Body()loginDto: LoginDto){
        return this.authservice.login(loginDto);
    }

}
