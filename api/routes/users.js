import express from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/Users.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send("hello user you have verified token")
// })
// router.get('/verifyUser/:id', verifyUser, (req, res, next) => {
//   res.send("hello user you are verified user")
// })

// router.get('/verifyAdmin', verifyAdmin, (req, res, next) => {
//   res.send("hello user you are verified admin")
// })

//UPDATE
router.put('/:id',verifyUser, updateUser)
//DELETE
router.delete('/:id',verifyUser, deleteUser)
//GET
router.get('/:id',verifyUser, getUser)
//GET ALL
router.get('/',verifyAdmin, getUsers)

export default router
