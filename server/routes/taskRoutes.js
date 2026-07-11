const express = require('express')
const {createTask, getTask ,updateTask, deleteTask} = require('../controllers/taskController')
const router = express.Router()
const protect = require('../middleware/authMiddleware')


router.post("/", protect ,createTask)
router.get("/", protect ,getTask)
router.put("/:id",protect,updateTask)
router.delete("/:id",protect,deleteTask)


module.exports = router; 