import { Router } from 'express'
import * as measurementsCtrl from '../controllers/measurements.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, measurementsCtrl.create)


export { router }