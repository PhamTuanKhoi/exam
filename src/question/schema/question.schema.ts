import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Subject } from 'src/subject/schema/subject.schema';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  name: string;

  @Prop()
  answer: Object[];

  @Prop()
  type: string;

  @Prop()
  level: number;

  @Prop()
  result: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
