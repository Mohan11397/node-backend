const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/:userId", getTask);
router.get("/", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
