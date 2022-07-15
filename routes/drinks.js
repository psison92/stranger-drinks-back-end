import { Router } from 'express'
import * as drinksCtrl from '../controllers/drinks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'



export { router }