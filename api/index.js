import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser' 

const app = express()

dotenv.config()

const PORT_NUMBER = process.env.PORT_NUMBER

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB) // connect with data base
    console.log('Connected to DB : MongoDB')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconnected', () =>
  console.log('MongoDB disconnected'),
) //in some case when mongodb disconnect this will run
mongoose.connection.on('connected', () => console.log('MongoDB connected'))

app.use(express.json()) // this is also a middleware this is for accepting json format data
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

//middlewares : this helps in handling the errors

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(PORT_NUMBER, () => {
  connectDB()
  console.log('backend running on :' + PORT_NUMBER)
})
