import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import connectDB from './config/db.js'
import path from 'path'
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js'
import albumsRoutes from './routes/albumsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import favAlbumRoutes from './routes/favAlbumRoutes.js'
import playListRoutes from './routes/playListRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: ["http://localhost:3000", "https://cube-music.onrender.com", "https://cube-music.anudeep.info"],
    credentials: true,
  })
);

//Routes****
app.use('/api/albums', albumsRoutes)
app.use('/api/users', userRoutes)
app.use('/api/favourites', favAlbumRoutes)
app.use('/api/playlists', playListRoutes)
app.use('/api/upload', uploadRoutes)
//******* */

//Uploads
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/frontend', express.static(path.join(__dirname, '/frontend')))

// //Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//Middlewares****
app.use(notFound)
app.use(errorHandler)
//******* */

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
)
