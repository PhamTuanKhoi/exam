import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoleEnum } from '../dto/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  role: UserRoleEnum;

  @Prop({ default: false })
  block: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
