import { React, useState } from "react";
import { Modal, Button, Form, Container, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import "./AddPhoto.scss";

/**
 * Modal with form asking for data to add new photo
 * @param {Boolean} show Show modal?
 * @param {CallableFunction} onClose Called on clicking close or outside the modal
 * @param {CallableFunction} onSubmit Called on submitting password
 */
function AddPhoto({ show, onClose, onSubmit }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Photo data submitted
   * @param {Event} event Photo detail submit event
   */
  function submitPhoto(event) {
    event.preventDefault();
    // Invalid image url
    if(imageLoading) {
      setError("Checking image, please try again");
      return;
    }
    if(!isImage) {
      setError("Please enter a valid image link");
      return;
    }
    onSubmit(url, name);
    onClose();
  }

  /**
   * Image load success or fail
   * @param {Boolean} isComplete Has the image loaded or did we get an error
   */
  function onImageLoad(isComplete) {
    setIsImage(isComplete);
    setImageLoading(false);
  }

  /**
   * Url changed, remove error and load image
   * @param {String} value New URL
   */
  function onChangeUrl(value) {
    setError("");
    setImageLoading(true);
    setUrl(value);
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new photo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitPhoto}>
        <Modal.Body>
          <Form.Group controlId="new-image-owner">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter content owner's name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="new-image-url">
            <Form.Label>Photo Link</Form.Label>
            <Form.Control
            className={error.length > 0 ? "is-invalid" : ""}
              type="url"
              required
              placeholder="Paste link to photo"
              value={url}
              onChange={(event) => onChangeUrl(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
          <Container className="preview-container">
            <Image className="preview-image"src={url} onLoad={()=>onImageLoad(true)} onError={()=>onImageLoad(false)} ></Image>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

AddPhoto.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPhoto;
