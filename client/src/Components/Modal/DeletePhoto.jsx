import { React, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

function DeletePhoto({ show, onClose, onSubmit }) {
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    onSubmit(password);
    setPassword("");
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submit}>
        <Modal.Body>
          <Form.Group controlId="delete-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

DeletePhoto.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeletePhoto;
