import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export default mongoose.model("User", UserSchema);

// Actions
// export const getUsers = () => UserModel.find();
// export const getUserBySessionToken = (token: string) =>
//   UserModel.findOne({ "authentication.sessionToken": token });
// export const getUserById = (id: string) => UserModel.findOne({ id });
// export const deleteUserById = (id: string) =>
//   UserModel.findOneAndDelete({ id });
// export const updateUserById = (id: string, values: Record<string, any>) =>
//   UserModel.findByIdAndUpdate(id, values);
