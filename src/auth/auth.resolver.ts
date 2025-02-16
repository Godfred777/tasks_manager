import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
    constructor (private authService: AuthService) {}

    @Mutation(() => String)
    async register(@Args() userDto: RegisterUserDto) {
        return await this.authService.registerUser(userDto);
    }

    @Mutation(() => String)
    async login(@Args() userDto: LoginDto) {
        return await this.authService.login(userDto)
    }
}
