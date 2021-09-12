import express from 'express'
import {
  addPLAlbum,
  addPlayList,
  addSongtoPL,
  getPlayListDetails,
  getPlayLists,
  removePlayList,
  removeSongfromPL,
} from '../controllers/playListControllers.js'
import { protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(protect, addPLAlbum)
  .put(protect, addPlayList)
  .get(protect, getPlayLists)

router
  .route('/:playListTitle')
  .put(protect, addSongtoPL)
  .get(protect, getPlayListDetails)
  .delete(protect, removePlayList)

router.route('/:playListTitle/:songName').delete(protect, removeSongfromPL)

export default router
