import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { }

    async signup(email: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new ForbiddenException("User already exists");
        }
        const newUser = new this.userModel({ email, password: hash });
        return newUser.save();
    }

    async login(email: string, password: string) {
        console.log("email ", email)
        console.log("password ", password)
        const user = await this.userModel.findOne({ email }).select('+password');
        console.log("user ", user)
        if (!user) {
            throw new NotFoundException("User not found");
        }
        if (!user.password) {
            throw new Error("Invalid password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
