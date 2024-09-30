import express from 'express'
import authControllers from '../controllers/auth.controllers.js'

const router = express.Router()

router.route('/auth/login').post(authControllers.login)


export default router;