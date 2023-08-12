import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    }
});

export default mongoose.model('User', UserSchema);

// String, Boolean, {}, [String]