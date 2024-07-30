import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String
});

const User = mongoose.model('User', userSchema,'emailUsers');

export default User;
