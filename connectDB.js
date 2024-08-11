import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {

        })
        // console.log("DB connected... in Signup with ", process.env.MONGO_URL)
    } catch (err) {
        console.error(err.message);
    }
}

export default connectDB