import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPSConfig extends Document {
  isOpen: boolean;
  deadline: Date | null;
}

const PSConfigSchema = new Schema<IPSConfig>(
  {
    isOpen:   { type: Boolean, default: true },
    deadline: { type: Date, default: null },
  },
  { timestamps: true }
);

const PSConfig: Model<IPSConfig> =
  (mongoose.models.PSConfig as Model<IPSConfig>) ||
  mongoose.model<IPSConfig>('PSConfig', PSConfigSchema);

export default PSConfig;
