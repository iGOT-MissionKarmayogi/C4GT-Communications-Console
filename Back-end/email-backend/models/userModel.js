import mongoose from 'mongoose';

/**
 * Represents the user schema.
 *
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {number} age - The age of the user.
 * @property {string} address - The address of the user.
 */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String
});

const User = mongoose.model('User', userSchema,'emailUsers');

export default User;
