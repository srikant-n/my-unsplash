
const mongoose = require('mongoose');

/**
 * Schema for the Image model
 */ 
const imageSchema = new mongoose.Schema({
    url: String,
    owner: String,
    addedOn: {type: Date, default: Date.now}
});

/**
 * Model for images
 */
const Image = module.exports = mongoose.model('image', imageSchema);

/**
 * Make a DB query to get all the images sorted by new to old
 * @param {func(error,data)} callback Get all images
 */
module.exports.getAllImages = (callback) => {
    Image.find({}, null, {sort: '-addedOn'}, callback);
}

/**
 * Makea  DB query to get images with names matching the search term
 * @param {String} search Owner name search term
 * @param {func(error,data)} callback Get images matching the search
 */
module.exports.getImages = (search, callback) => {
    Image.find({ owner: new RegExp(search,"ig") }, null, {sort: '-addedOn'}, callback);
}

/**
 * Add a new image to the DB
 * @param {{url, owner}}} newImage Image to add
 * @param {func(error,data)} callback Callback after adding to database
 */
module.exports.addImage = (newImage, callback) => {
    const image = new Image({
        url: newImage.url,
        owner: newImage.owner
    })
    image.save(callback)
}

/**
 * Add multiple images to db
 * @param {[{}]} images Array of images to add
 * @param {func(error,callback)} callback 
 */
module.exports.addMultipleImages = (images, callback) => {
    Image.insertMany(images,callback);
}

/**
 * Delete an image based on given id
 * @param {String} id _id of the image
 * @param {func(error,data)} callback Callback on delete
 */
module.exports.deleteImage = (id, password, callback) => {
    if(password === "password") {
        Image.deleteOne({_id:id}, null, callback);
    } else {
        callback("Invalid Password");
    }
}