import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user"}
});


UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", UserSchema);