import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true }
})

const User = mongoose.model('user', userSchema)

export { User }