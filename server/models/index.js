import mongoose from "mongoose";

//model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    type: String,
    status: {
        type: String,
        default: 'not verified'
    },
    accessToken: {
        type: String,
        default: ''
    }
});

const UserModel = mongoose.model('bookstoreUser', userSchema);

export default UserModel;