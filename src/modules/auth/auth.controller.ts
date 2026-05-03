import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";
import { GetUser } from "src/shared/decorators/user.decorator";
import { User } from "../user/schema/user.schema";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('/login')
    @ApiOperation({ summary: 'Sign in a user' })
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get user profile' })
    @ApiBearerAuth()
    getProfile(@GetUser() user: User) {
        return this.authService.getProfile(user._id);
    }

}