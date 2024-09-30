import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password must be at least 6 characters long']
    }
},{
  timestamps:true
})

// pre-hook function to has password before it is saved
userSchema.pre('save', async function(next) {
    const user = this;
    //hash if password is modified or is new
    if(!user.isModified('password')){
        return next()
    }
    try {

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

//compare passwords 
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(this.password,enteredPassword)
}


// Pre 'findOneAndUpdate' hook to hash the password if it's modified
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    //  console.log(update)
    // Only hash the password if it is being updated
    if (update.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        update.password = await bcrypt.hash(update.password, salt);
      } catch (err) {
        return next(err);
      }
    }
  
    next();
});

export default mongoose.model('User',userSchema)

