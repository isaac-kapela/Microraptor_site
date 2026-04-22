import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMember extends Document {
  name: string;
  area: string;
  photo: string;
  isLeader: boolean;
  order: number;
  createdAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    area: { type: String, required: true },
    photo: { type: String, required: true },
    isLeader: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Member: Model<IMember> =
  (mongoose.models.Member as Model<IMember>) ||
  mongoose.model<IMember>('Member', MemberSchema);

export default Member;
