import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthResponse } from './entities/auth.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor (private authService: AuthService) {}

    @Mutation(() => User)
    async register(@Args('input') userDto: RegisterUserDto) {
        return await this.authService.registerUser(userDto);
    }

    @Mutation(() => AuthResponse)
    async login(@Args('input') userDto: LoginDto) {
        return await this.authService.login(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => User)
    async getProfile(@Context() context) {
        return context.req.user;
    }
       
}


