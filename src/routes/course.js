const express  = require("express")
const router = express.Router()
const courseController = require("../app/controllers/CourseController")

router.get("/create", courseController.new)
router.post("/create", courseController.create)
router.get("/:id/update", courseController.edit)
router.patch("/:id/update", courseController.update)
router.delete("/:id", courseController.destroy)
router.get("/:slug", courseController.show)
router.get("/", courseController.index)

module.exports = router
