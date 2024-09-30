
const errorHandler  = (err,req,res,next)=>{

    if(err.name === 'ValidationError'){
        const errors = Object.values(err.errors).map(err => err.message);
        return res.status(400).json({ message: errors });
    }
    if (err.code === 11000) {
        return res.status(400).json({ message:'Email already in use'});
    }
    if (err.status === 404) {
        return res.status(404).json({err: err.message });
    }
    if(err.kind ==='ObjectId'){
        return res.status(400).json({ error: 'Invalid user ID format'});
    }
    console.log(err.stack)
   res.status(500).json({
     error: err.message || 'Internal Server Error'
   })
}

export default errorHandler