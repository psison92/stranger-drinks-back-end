import { Router } from 'express'
import * as drinksCtrl from '../controllers/drinks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', drinksCtrl.index)



/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, drinksCtrl.create)
router.delete('/:id', checkAuth, drinksCtrl.delete)
router.put('/:id', checkAuth, drinksCtrl.update)
router.put('/:id/add-photo', checkAuth, drinksCtrl.addPhoto)
router.post('/:id/create-review', checkAuth, drinksCtrl.createReview)

export { router }