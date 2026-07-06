import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Designation, DesignationDocument } from './schemas/designation.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Designation.name) private readonly designationModel: Model<DesignationDocument>
    ) { }

    async createUser(user: Partial<User>): Promise<User> {
        if (user.designation && user.designation.length > 0) {
            const resolvedDesignations = await Promise.all(
                user.designation.map(async (d) => {
                    const designationTitle = d as unknown as string;
                    let designationDoc = await this.designationModel.findOne({ title: designationTitle }).exec();
                    if (!designationDoc) {
                        designationDoc = await this.designationModel.create({ title: designationTitle });
                    }
                    return designationDoc;
                })
            );
            user.designation = resolvedDesignations;
        }
        return await this.userModel.create(user) as unknown as User;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find().populate({ path: 'designation', select: 'title' }).exec();
    }

    async updateUser(id: string, user: User): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        if (!updatedUser) {
            throw new HttpException({ message: 'User not found', error: 'Not Found', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        }
        return updatedUser;
    }
}
