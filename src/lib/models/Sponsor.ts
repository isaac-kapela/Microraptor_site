import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISponsor extends Document {
  name: string;
  src: string;
  site: string;
  category: string;
  order: number;
  createdAt: Date;
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name:     { type: String, required: true },
    src:      { type: String, required: true },
    site:     { type: String, default: '#' },
    category: { type: String, default: 'Parceiro' },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Sponsor: Model<ISponsor> =
  (mongoose.models.Sponsor as Model<ISponsor>) ||
  mongoose.model<ISponsor>('Sponsor', SponsorSchema);

export default Sponsor;
