import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class UserRespository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    findOneByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    findOneById(id: Types.ObjectId, select = {}) {
        return this.userModel.findOne({ _id: id }, select);
    }

    create(user: Partial<User>) {
        return this.userModel.create(user);
    }

    updateOneById(filter, update) {
        return this.userModel.updateOne(filter, update);
    }

    // findAll(filter, options) {
        // return this.userModel.find(filter, options);
    // }
}