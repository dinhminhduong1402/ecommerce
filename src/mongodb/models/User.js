import mongoose, { models } from "mongoose";
 
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});
 
const User = models.User || mongoose.model("User", UserSchema, 'user')
export default User;