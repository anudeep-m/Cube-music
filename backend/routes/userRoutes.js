import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protect } from '../Middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
