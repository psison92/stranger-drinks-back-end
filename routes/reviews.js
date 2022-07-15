import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'


export { router }