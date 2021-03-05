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
            "https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        owner: "Lisa Fotios",
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

const imageController = {
    getAllImages(req,res) { // Get all the images
        res.send(images);
    },
    getImages(req, res) { // Get images based on search query
        let data;
        if (req.params.search) {
            data = images.filter((image) => image.owner.includes(req.params.search));
        } else {
            data = images;
        }
        res.send(data);
    },
    addImage(req, res) { // Add new image
        const imageData = {
            id: new Date().valueOf(),
            url: req.body.url,
            owner: req.body.owner,
        };
        images.unshift(imageData);
        res.send(imageData);
    },
    deleteImage(req, res) { // Delete an image if the password is right
        console.log(req.params);
        if (req.body === "password") {
            images = images.filter((image) => image.id != req.params.imageId);
            res.send(true);
            console.log(images);
        } else {
            res.status(401).send("Invalid Password"); 
        }
    },
};

module.exports = imageController;