import mongoose from 'mongoose';
import { Subject } from 'src/subject/schema/subject.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExamDocument = HydratedDocument<Exam>;

@Schema({
  timestamps: true,
})
export class Exam {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
