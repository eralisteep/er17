const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const countRouter = require('./countRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/count', countRouter)
router.use('/device', deviceRouter)

module.exports = router