import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const movieTitle = req.params.movieTitle
    cb(null, `frontend/public/Albums/${movieTitle}`)
  },
  filename(req, file, cb) {
    const movieTitle = req.params.movieTitle
    const songName = req.params.songName

    if (!songName) {
      cb(null, `${movieTitle}${path.extname(file.originalname)}`)
    } else {
      cb(null, `${songName}${path.extname(file.originalname)}`)
    }
  },
})

const checkFileTypePoster = (file, cb) => {
  const fileTypes = /png|webp/
  const extensionName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )

  const mimetype = fileTypes.test(file.mimetype)

  if (extensionName && mimetype) {
    return cb(null, true)
  } else {
    cb('Images Only! (.png or .jpg or .jpeg)')
  }
}

const checkFileTypeSong = (file, cb) => {
  const fileTypes = /mp3/
  const extensionName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )

  const mimetype = fileTypes.test('audio/mp3')

  if (extensionName && mimetype) {
    return cb(null, true)
  } else {
    cb('MP3 Audio files only')
  }
}

const uploadMoviePoster = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypePoster(file, cb)
  },
})

const uploadSongFile = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypeSong(file, cb)
  },
})

router.post(
  '/:movieTitle/moviePoster',
  uploadMoviePoster.single('image'),
  (req, res) => {
    let filePath1 = req.file.path
    filePath2 = filePath1.slice(16)
    res.send(`/${filePath1}`)
  }
)

router.post(
  '/:movieTitle/:songName/songFile',
  uploadSongFile.single('audio/mp3'),
  (req, res) => {
    let filePath2 = req.file.path
    filePath2 = filePath2.slice(16)
    res.send(`/${filePath2}`)
  }
)

export default router
