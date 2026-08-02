import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAreasPDF extends Document {
  url: string;
  filename: string;
}

const AreasPDFSchema = new Schema<IAreasPDF>(
  {
    url:      { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

const AreasPDF: Model<IAreasPDF> =
  (mongoose.models.AreasPDF as Model<IAreasPDF>) ||
  mongoose.model<IAreasPDF>('AreasPDF', AreasPDFSchema);

export default AreasPDF;
