let images = [
    {
        id: 0,
        url:
            "https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Lisa Fotios",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 1,
        url:
            "https://images.pexels.com/photos/196643/pexels-photo-196643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "picjumbo.com",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 2,
        url:
            "https://images.pexels.com/photos/1838607/pexels-photo-1838607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Elina Sazonova",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 3,
        url:
            "https://images.pexels.com/photos/2865987/pexels-photo-2865987.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Annelies Brouw",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 4,
        url:
            "https://images.pexels.com/photos/1373915/pexels-photo-1373915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Lisa Fotios",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 5,
        url:
            "https://images.pexels.com/photos/3714083/pexels-photo-3714083.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Andretti Brown",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 6,
        url:
            "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Lisa Fotios",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 7,
        url:
            "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Engin Akyurt",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 8,
        url:
            "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Jill Wellington",
        tag: "food",
        date: "2020-02-02",
    },
    {
        id: 9,
        url:
            "https://images.pexels.com/photos/1239312/pexels-photo-1239312.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Dana Tentis",
        tag: "food",
        date: "2020-02-02",
    },
];

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