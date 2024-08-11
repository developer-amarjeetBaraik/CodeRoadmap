import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    uniqueId: String,
    name: String,
    email: String,
    password: String
})

const SignupInfo = mongoose.models.signupinfo || mongoose.model('signupinfo', signupSchema);

export default SignupInfo;