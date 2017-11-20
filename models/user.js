const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique:true, required: [true, 'Necesitas un username'] },
  email: { type: String, required: [true, 'Necesitas un email'] },
  password: { type: String, select: false },
  pile: { type: Schema.Types.ObjectId, ref: 'Pile'},
  avatar: { type: String, default: '/uploads/user-pictures/blank.png'},
  githubId: { type: String },
  token: { type: String }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
module.exports = User;
