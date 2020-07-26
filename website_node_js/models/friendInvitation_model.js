const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    to: { type: Schema.Types.ObjectId, ref: 'users' },
    from: { type: Schema.Types.ObjectId, ref: 'users' },
    accepted: Boolean
})

const FriendsInvitations = mongoose.model("friends-invitations", friendsSchema);
module.exports = FriendsInvitations;
