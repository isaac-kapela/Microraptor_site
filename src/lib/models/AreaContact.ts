import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAreaContact extends Document {
  slug: string;
  whatsapp: string;
}

const AreaContactSchema = new Schema<IAreaContact>(
  {
    slug:      { type: String, required: true, unique: true },
    whatsapp:  { type: String, required: true },
  },
  { timestamps: true }
);

const AreaContact: Model<IAreaContact> =
  (mongoose.models.AreaContact as Model<IAreaContact>) ||
  mongoose.model<IAreaContact>('AreaContact', AreaContactSchema);

export default AreaContact;
