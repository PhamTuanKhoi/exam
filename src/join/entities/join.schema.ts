import mongoose from 'mongoose';
import { Exam } from 'src/exam/schema/exam.schema';
import { User } from 'src/user/schema/user.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JoinDocument = HydratedDocument<Join>;

@Schema()
export class Join {
  @Prop({ default: 0 })
  scores: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Exam.name })
  exam: Exam;
}

export const JoinSchema = SchemaFactory.createForClass(Join);
