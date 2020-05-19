const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    profilePhoto: String,
    phoneNo: String,
    commonId:String,
    meetings: [Number],
})

const User = mongoose.model("user", userSchema);
module.exports = User;
