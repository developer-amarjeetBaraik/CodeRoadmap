import mongoose from "mongoose";

// const languages = new mongoose.Schema({
//     language: Object
// })

const contentSchema = new mongoose.Schema({
    email: String,
    collections: []
})

const contentInfo = mongoose.model.contentInfo || mongoose.model('contentInfo', contentSchema)

export default contentInfo