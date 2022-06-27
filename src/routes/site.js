const express  = require("express")
const router = express.Router()
const siteController = require("../app/controllers/SiteController")

router.get("/search", siteController.search)
router.post("/search", siteController.post_search)
router.get("/", siteController.home)

module.exports = router
