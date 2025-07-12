import mongoose, { Schema, Document } from 'mongoose';
export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  year: number;
}

const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>('Book', BookSchema);
