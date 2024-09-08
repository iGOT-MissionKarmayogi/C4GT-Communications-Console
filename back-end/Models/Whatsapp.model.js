import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  whatsappNumber: {
    type: String,
    required: true
  }
});

const User = mongoose.model('WhatsAppUser', userSchema, 'whatsAppUsers');

export default User;
