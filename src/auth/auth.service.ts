import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService} from '@nestjs/jwt'
@Injectable()
export class AuthService {

    constructor(
        private readonly clientService: ClientService,
        private readonly jwtService : JwtService,
    ){}


    async register({fullname,password,email,phone,rut,status}: RegisterDto){
        const user = await this.clientService.findOne(rut);

        if(user){
            throw new BadRequestException('El cliente ya existe');
        }
        return await this.clientService.create({
            fullname,
            password: await bcrypt.hash(password,10),
            email,
            phone,
            rut,
            status});
    }

    async login({rut,password}: LoginDto){
        const user = await this.clientService.findOne(rut);
        if(!user){
            throw new UnauthorizedException('El RUT no es valido')

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Clave Incorrecta')
        }

        const payload = {rut: user.rut};
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            rut
        };
    }
}
