import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPhoto extends Document {
  category: 'carousel' | 'bastidores' | 'album';
  src: string;
  type: 'image' | 'video';
  year?: number;
  order: number;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhoto>(
  {
    category: {
      type: String,
      enum: ['carousel', 'bastidores', 'album'],
      required: true,
    },
    src: { type: String, required: true, unique: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    year: { type: Number },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Photo: Model<IPhoto> =
  (mongoose.models.Photo as Model<IPhoto>) ||
  mongoose.model<IPhoto>('Photo', PhotoSchema);

export default Photo;
