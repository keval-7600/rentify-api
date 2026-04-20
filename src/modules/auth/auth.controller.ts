import { Body, Controller, Get, Post } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('/login')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Get('/profile')
    getProfile() {
        // return this.authService.getProfile();
    }

}