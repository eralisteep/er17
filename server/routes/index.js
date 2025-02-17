const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const countRouter = require('./countRouter')
const testResultRouter = require('./testResultRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/count', countRouter)
router.use('/device', deviceRouter)
router.use('/testResult', testResultRouter)

module.exports = router