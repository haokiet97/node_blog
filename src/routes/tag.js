const express  = require("express")
const router = express.Router()
const tagController = require("../app/controllers/TagController")

// router.get("/create", courseController.new)
// router.post("/create", courseController.create)
router.get("/:id/update",  tagController.edit)
router.patch("/:id/update", tagController.update)
// router.delete("/:id", courseController.destroy)
router.get("/:id", tagController.show)
// router.get("/", courseController.index)

module.exports = router
