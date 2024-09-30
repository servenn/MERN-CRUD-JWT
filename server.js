
import express from 'express'
import  connectDB from './config/database.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import errorHandler from './middleware/errorMiddleware.js'

const app = express();

app.use(express.json())
app.use('/',userRoutes)
app.use('/',authRoutes)

app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});