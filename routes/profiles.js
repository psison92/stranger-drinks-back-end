import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth ,profilesCtrl.show)
router.post('/:id/hangover-tip', checkAuth, profilesCtrl.create)
router.delete('/hangover-tip/:tipId', checkAuth, profilesCtrl.delete)
// router.put('/hangover-tip/:tipId', checkAuth, profilesCtrl.editTip)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
