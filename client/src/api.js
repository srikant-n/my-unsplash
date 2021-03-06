const BASE_URL = "/images";

/**
 * Handle errors from Fetch
 * @param {*} response Response from fetch
 * @returns Error or response
 */
function handleErrors(response) {
  if (!response.ok) {
    // throw (response.statusText);
    throw response.status;
  }
  return response;
}

/**
 * Get image data for all the images to display
 * @returns json array containing all images
 */
async function getAllImages() {
  const response = await fetch(BASE_URL)
    .then(handleErrors)
    .then((res) => res.json());

  return response;
}

/**
 * Get image data based on search query
 * @param {String} search Search query for images
 * @returns json array containing all images
 */
async function getImages(search) {
  const response = await fetch(BASE_URL + "/" + search)
    .then(handleErrors)
    .then((res) => res.json());

  return response;
}

/**
 * Add a new image to the gallery
 * @param {url,owner} image Image data for the image to add
 * @returns Image data from server with id and date added
 */
async function addImage(image) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(image),
  })
    .then(handleErrors)
    .then((res) => res.json());

  return response;
}

/**
 * Delete an image
 * @param {String} id Image id of the image to be deleted
 * @param {String} password Entered password
 * @returns true if deleted
 */
async function deleteImageById(id, password) {
  const response = await fetch(BASE_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "text/plain",
    },
    body: password, // body data type must match "Content-Type" header
  })
    .then(handleErrors)
    .then((res) => res.json());

  return response;
}

export { getAllImages, getImages, addImage, deleteImageById };
