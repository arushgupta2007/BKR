const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    meetingID:Number,
    meetingName:String,
    meetingSession: Schema.Types.Mixed,
    tokens:[{type: String}],
    code: String,
    next_id: Number,
    usersPrev: [String],
})

const Meeting = mongoose.model("meeting", userSchema);
module.exports = Meeting;
 
