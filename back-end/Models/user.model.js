import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;