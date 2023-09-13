import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Exam } from 'src/exam/schema/exam.schema';
import { Question } from 'src/question/schema/question.schema';
import { User } from 'src/user/schema/user.schema';

export type HistoryDocument = HydratedDocument<History>;

@Schema({
  timestamps: true,
})
export class History {
  @Prop()
  answer: string;

  @Prop()
  result: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Question })
  question: Question;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => Exam })
  exam: Exam;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User })
  user: User;
}

export const HistorySchema = SchemaFactory.createForClass(History);
