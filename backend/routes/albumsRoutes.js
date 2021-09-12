import express from 'express'

const router = express.Router()
import {
  getAlbums,
  addAlbum,
  addSong,
  getAlbumByTitle,
  getSongByTitle,
  deleteAlbum,
  editAlbum,
  deleteSong,
  editSong,
  getAlbumById,
  getSongById,
} from '../controllers/albumsControllers.js'
import { protect, admin } from '../Middlewares/authMiddleware.js'

router.route('/').get(getAlbums)

router.route('/:movieTitle').get(getAlbumByTitle)

router.route('/:movieTitle/:songName').get(getSongByTitle)

//For Admin
router.route('/admin').post(protect, admin, addAlbum)

router
  .route('/admin/movie/:movieId')
  .get(protect, admin, getAlbumById)
  .delete(protect, admin, deleteAlbum)
  .put(protect, admin, editAlbum)
  .post(protect, admin, addSong)

router
  .route('/admin/song/:movieId/:songId')
  .get(protect, admin, getSongById)
  .delete(protect, admin, deleteSong)
  .put(protect, admin, editSong)

export default router
