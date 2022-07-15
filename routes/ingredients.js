import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'




export { router }