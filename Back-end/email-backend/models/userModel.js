import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile_no: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  join_date: {
    type: Date,
    required: true
  },
  last_login: {
    type: Date,
    required: true
  }
});

const User = mongoose.model('User', userSchema,'emailUsers');
export default User;