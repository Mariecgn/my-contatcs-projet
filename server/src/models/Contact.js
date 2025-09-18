// server/src/models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, minlength: 10, maxlength: 20 },
    email: { type: String, trim: true },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

// export par défaut pour permettre: import Contact from '../models/Contact.js'
export default mongoose.model('Contact', contactSchema);
