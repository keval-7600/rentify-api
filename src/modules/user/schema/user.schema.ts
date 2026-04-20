import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Role } from "src/shared/enums/role.enum";
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({type: SchemaTypes.ObjectId})
    _id: Types.ObjectId;

    @Prop({length: 8, nullable: true})
    name: string;

    @Prop({length: 25})
    email: string;

    @Prop()
    password: string;

    @Prop({ nullable: true })
    salt: string;

    @Prop({default: Role.USER})
    role: string;

    @Prop({nullable: true})
    token: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        if (hash === this.password) {
            return true;
        }
    
        return false;
    }
}



export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function () {
    if (this.password) {
        this.password = await bcrypt.hash(this.password, this.salt);
    }
});