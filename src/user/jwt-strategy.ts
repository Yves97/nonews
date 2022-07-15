import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy,ExtractJwt } from "passport-jwt";
import { jwtContants } from "./constants";
import { JwtPayload } from "./user-jwt-payload.interface";
import { UserRepository } from "./user.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : jwtContants.secret
        })
    }

    async validate(payload : JwtPayload){
        const {email} = payload
        const user = this.userRepository.findOne({email})
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}