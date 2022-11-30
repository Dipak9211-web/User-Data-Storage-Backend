import mongoose from 'mongoose'
const {Schema} = mongoose
const userDataSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
      },
    lastName: {
        type: String,
        trim: true,
        required: true,
      },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
    country: {
        type: String,
        required: true,
        trim: true,
        required: true,
      },
}, { timestamps: true })

export default mongoose.model("Profile", userDataSchema);