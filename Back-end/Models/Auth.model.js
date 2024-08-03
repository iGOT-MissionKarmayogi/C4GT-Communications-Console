import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Represents the authentication schema for the user.
 *
 * @typedef {Object} AuthSchema
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} [role=Admin] - The role of the user. Defaults to "Admin".
 */
const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Admin",
    },
});


AuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Auth = mongoose.model("Auth", AuthSchema);

export default Auth;