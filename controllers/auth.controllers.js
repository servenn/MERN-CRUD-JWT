import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//login logic:check email,password and generates a token
const login = async(req,res)=>{
    const {email} = req.body
    try {
        //check if user exist
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                error:'Invalid email or password'
            })
        }
        //compare passwords
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(400).json({
                error:'Invalid username or password'
            }) 
        }

        //generate jwt token
        const token = jwt.sign(
            {
              id: user._id, 
            },
            process.env.jwt_secret,
            { expiresIn: '1h' } // Token expires in 1 hour
        );
        //hide password before sent to the user
        user.password = undefined;
        res.status(200).json({
            token,
            user:user,
            message:'User logged in successfully'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}

// verifies token from protected routes
const authenticate = (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from 'Bearer <token>'

    if (!token) {
        const err = new Error('Access denied. No token provided.')
        err.status = 400
        throw err
    }
  
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret); // Verify the token 
      next(); //pass control to the next middleware
    } catch (error) {
        next(error)
   
    }

}

//verifies if user has permision to perform certain operations like edit or delete
const isAuthorized = async(req,res,next)=>{
    const user = req.user && req.user.id === req.params.userId
    console.log(req.user.id)
    if(!user){
        return res.status(400).json({
            error:'User not authorized'
        })
    }
    next()
}

export default {
    login,authenticate,isAuthorized
}