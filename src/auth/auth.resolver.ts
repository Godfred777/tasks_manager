import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthResponse } from './entities/auth.entity';

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

    @Query(() => String)
    getProfile() {
        return "Not implemented";
    }
}
