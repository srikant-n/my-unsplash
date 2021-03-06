const express = require("express");
const imageController = require("./controller");
const bodyParser = require("body-parser");

// express.Router is a class to create route handlers  
//router will contain the Router instance.  
const router = express.Router();  

// Get all images
router.get("/", imageController.getAllImages);
// Get all images based on search term
router.get("/:search", imageController.getImages);
// Add new image
router.post("/", bodyParser.json(), imageController.addImage);
// Delete image
router.delete("/:imageId", bodyParser.text(), imageController.deleteImage);

module.exports = router;