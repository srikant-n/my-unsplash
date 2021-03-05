const express = require("express");
const imageController = require("./controller");
const bodyParser = require("body-parser");

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
const router = express.Router();  

// Home page
// router.get("/", imageController.home);
// Get all images
router.get("/images", imageController.getAllImages);
// Get all images based on search term
router.get("/images/:search", imageController.getImages);
// Add new image
router.post("/images", bodyParser.json(), imageController.addImage);
// Delete image
router.delete("/images/:imageId", bodyParser.text(), imageController.deleteImage);

module.exports = router;