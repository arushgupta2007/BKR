const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    profilePhoto: String,
    phoneNo: String,
    commonId:String,
    email: String,
    meetings: [{ type: Schema.Types.ObjectId, ref: 'meeting' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'friends' }],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
