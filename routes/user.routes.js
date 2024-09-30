import express from 'express'
import userControllers from '../controllers/user.controller.js'
import authControllers from '../controllers/auth.controllers.js'

const router = express.Router()

router.route('/api/users')
            .post(userControllers.createUser)
            .get(userControllers.getUsers)
            
router.route('/api/users/:userId')
            .get(authControllers.authenticate,userControllers.getUser)
            .put(authControllers.authenticate,authControllers.isAuthorized,userControllers.updateUser)
            .delete(authControllers.authenticate,authControllers.isAuthorized,userControllers.removeUser)

export default router