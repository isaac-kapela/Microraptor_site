import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactInfo extends Document {
  label: string;
  href: string;
  type: 'email' | 'phone' | 'whatsapp';
  order: number;
  createdAt: Date;
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    label:  { type: String, required: true },
    href:   { type: String, required: true },
    type:   { type: String, enum: ['email', 'phone', 'whatsapp'], required: true },
    order:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ContactInfo: Model<IContactInfo> =
  (mongoose.models.ContactInfo as Model<IContactInfo>) ||
  mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);

export default ContactInfo;
