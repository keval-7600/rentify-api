import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt.payload";
import { UserRespository } from "src/modules/user/user.repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRespository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret@123',
            passReqToCallback: true
        })
    }

    //Auth Guard 'jwt' validation check
    async validate(req, payload: JwtPayload): Promise<any> {
        const { id } = payload;
        const user = await this.userRepository.findOneById(id, { token: 1 })

        if (!user || !user?.token)
            throw new UnauthorizedException(`Your account is de-activated. Please contact support for help.`);

        return user;
    }
}