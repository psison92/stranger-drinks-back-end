import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, ingredientsCtrl.create)


export { router }