const BASE_URL = "/images"
/**
 * Get image data for all the images to display
 * @returns json array containing all images
 */
async function getAllImages() {
    const response = await fetch(BASE_URL);
    return response.json();
}

/**
 * Get image data based on search query
 * @param {String} search Search query for images
 * @returns json array containing all images
 */
async function getImages(search) {
    const response = await fetch(BASE_URL + "/" + search);
    return response.json();
}

async function addImage(image) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(image) // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
    } catch(error){console.log(error)};
  
}

async function deleteImageById(id, password) {
    // Default options are marked with *
    try {
        const response = await fetch(BASE_URL + "/" + id, {
            method: 'DELETE',
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'text/plain'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: password // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
    } catch (error){
        return error;
    }
  
}

export {getAllImages, getImages, addImage, deleteImageById};