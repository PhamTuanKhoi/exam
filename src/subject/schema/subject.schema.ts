import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema()
export class Subject {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  favourites: User[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
