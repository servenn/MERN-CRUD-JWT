import User from '../models/User.js'
import mongoose from 'mongoose'
//create a user
const createUser = async(req,res,next)=>{
    try {
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(200).json({
            message:'User has been created'
        })
    } catch (error) {
      next(error)
    } 

    
}
//get all users
const getUsers = async(req,res,next)=>{
    try {
        //fetch all users from the database
        const allUsers = await User.find().select('-password')
        return res.status(200).json(allUsers)

    } catch (error) {
       next(err) 
    }
}

//get a single user by Id
const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        if(!user){
             const error = new Error('User not found');
             error.status = 404;
             throw error;
        } 
        res.status(400).json(user)

    } catch (error) {
        next(error)
    }
}

// update user
const updateUser = async(req,res,next)=>{
    try {
        const { id } = req.params; 
        const {name,email,password} = req.body;
        // console.log(id)
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {name,email,password},
            { new: true,runValidators:true, context: 'query' } ).select('-password')
        
        if(!updatedUser){
            const error = new Error('User not found');
             error.status = 404;
             throw error;
        } 

        return res.status(200).json(updatedUser) 
    } catch (error) {
        next()
       
    }  
}

//delete user
const removeUser =  async (req, res,next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id).select('-password');
      if (!deletedUser) {
        const error = new Error('User not found');
             error.status = 404;
             throw error;
      }
      res.status(200).json({
        message:'User deleted sucessfully'
      })
    } catch (err) {
       next(err)
    }
};


export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    removeUser
}