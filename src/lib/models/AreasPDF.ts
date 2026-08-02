import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAreasPDF extends Document {
  url: string;
  filename: string;
  docType: 'areas' | 'edital';
}

const AreasPDFSchema = new Schema<IAreasPDF>(
  {
    url:      { type: String, required: true },
    filename: { type: String, required: true },
    docType:  { type: String, enum: ['areas', 'edital'], default: 'areas' },
  },
  { timestamps: true }
);

const AreasPDF: Model<IAreasPDF> =
  (mongoose.models.AreasPDF as Model<IAreasPDF>) ||
  mongoose.model<IAreasPDF>('AreasPDF', AreasPDFSchema);

export default AreasPDF;
