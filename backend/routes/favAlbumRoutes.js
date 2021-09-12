import express from 'express'
import { protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()
import {
  addFavAlbum,
  addSongtoFav,
  getFavAlbum,
  removeSongfromFav,
} from '../controllers/favAlbumControllers.js'

router
  .route('/')
  .post(protect, addFavAlbum)
  .put(protect, addSongtoFav)
  .get(protect, getFavAlbum)

router.route('/:songName').delete(protect, removeSongfromFav)

export default router
