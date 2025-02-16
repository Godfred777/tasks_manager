import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { RegisterUserDto } from './dto/registerUser.dto';   
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        const user = await this.usersService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        
        throw new Error('Invalid email or password.');
    }

    async registerUser(userDto:RegisterUserDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(userDto.email)
        if (user) {
            throw new ConflictException('User already exists');
        } try {
            const hashed_password = await bcrypt.hash(userDto.password, 10);
            const user: Prisma.UserCreateInput = {
                username: userDto.username,
                email: userDto.email,
                password: hashed_password,
                createdAt: new Date(),
                updatedAt: new Date()

            }
            const newUser = await this.usersService.create(user);
            const {password, ...result} = newUser;
            return result;
        } catch (error) {
            throw new BadRequestException(error.message)
        } 
    }
       

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}