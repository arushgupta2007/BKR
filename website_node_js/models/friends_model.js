const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    chatMessages: [Schema.Types.Mixed],
})

const Friends = mongoose.model("friends", friendsSchema);
module.exports = Friends;
