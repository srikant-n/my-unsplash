const model = require("./model");

const imageController = {
    getAllImages(req,res) { // Get all the images
        model.getAllImages((err, images) => err ? res.send(err) : res.send(images));
    },
    getImages(req, res) { // Get images based on search query
        if (req.params.search) {
            model.getImages(req.params.search, (err,images) => err ? res.send(err) : res.send(images));
        } else {
            model.getAllImages((err, images) => err ? res.send(err) : res.send(images));
        }
    },
    addImage(req, res) { // Add new image
        const imageData = {
            url: req.body.url,
            owner: req.body.owner,
        };
        model.addImage(imageData, (err, data) => err ? res.send(err) : res.send(data));
    },
    deleteImage(req, res) { // Delete an image if the password is right
        if (req.body) {
            model.deleteImage(req.params.imageId, req.body, (err, data) => err ? res.status(401).send("Invalid Password") : (data.deletedCount > 0 ? res.send(data) : res.status(400).send("Image Not Found")));
        } else {
            res.status(401).send("Enter Password"); 
        }
    },
};

module.exports = imageController;