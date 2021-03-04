import { React, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

function AddPhoto({ show, onClose, onSubmit }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  function submitPhoto(event) {
    event.preventDefault();
    onSubmit(url, name);
    onClose();
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
              type="url"
              required
              placeholder="Paste link to photo"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </Form.Group>
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
