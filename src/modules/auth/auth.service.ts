import { ConflictException, Injectable } from "@nestjs/common";
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from "./dto/signup.dto";
import { UserRespository } from "../user/user.repository";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "./strategy/jwt.payload";
import { ObjectId } from "mongodb";
import { User } from "../user/schema/user.schema";
import { JwtService } from "@nestjs/jwt";
import { Types } from "mongoose";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRespository,
        private readonly jwtService: JwtService
    ) {}
    async signup(signupDto: SignupDto) {
        const { email } = signupDto;
        // Check if user with the email already exists
        const user = await this.userRepository.findOneByEmail(email);
        
        if(user) {
            throw new ConflictException(`User with email ${email} already exists`);
        }

        const newUser = {
            ...signupDto,
            _id: new ObjectId(),
            salt: await bcrypt.genSalt(),
            token: null
        };

        await this.userRepository.create(newUser);

        return { message: 'User created successfully!' };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        // Check if user with the email already exists
        const user = await this.userRepository.findOneByEmail(email);
        
        if(!user) {
            throw new ConflictException(`User with email ${email} does not exist`);
        }

        const userObj = new User();
        userObj.password = user.password;
        userObj.salt = user.salt;

        const isPasswordValid = await userObj.validatePassword(password);

        if (!isPasswordValid) {
            throw new ConflictException(`Invalid credentials`);
        }

        const token = this.generateJWTToken(user);
        
        await this.userRepository.updateOneById({ _id: user._id }, { token });

        return { token };
    }

    async getProfile(id: Types.ObjectId) {
        return await this.userRepository.findOneById(id);
    }

    generateJWTToken(user) {
        const payload: JwtPayload = {
            id: user?._id,
            email: user?.email,
            name: user?.name,
            role: user?.role,
        };

        return this.jwtService.sign(payload);
    }
}