const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/user-pictures/" });

const userSchema = new Schema({
  username: { type: String, unique:true, required: [true, 'Necesitas un username'] },
  fullname: {type: String},
  email: { type: String },
  password: { type: String },
  pile: { type: Schema.Types.ObjectId, ref: 'Pile'},
  avatar: { type: String, default: '/uploads/user-pictures/blank.png'},
  githubId: { type: String },
  githubUrl: { type: String },
  token: { type: String }
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);
module.exports = User;
