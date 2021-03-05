import { React, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * Modal asking for password to delete photo
 * @param {Boolean} show Show modal?
 * @param {Boolean} isInvaid Is entered password invalid?
 * @param {CallableFunction} onClose Called on clicking close or outside the modal
 * @param {CallableFunction} onSubmit Called on submitting password
 */
function DeletePhoto({ show, isInvalid, onClose, onSubmit }) {
  const [password, setPassword] = useState("");
  const [startedTyping, setStartedTyping] = useState(false);

  useEffect(() => {
    setPassword("");
  }, [show]);

  /**
   * Password field value changed
   * @param {Event} event Password input value change event
   */
  function onChange(event) {
    !startedTyping && event.target.value.length > 0 && setStartedTyping(true);
    setPassword(event.target.value);
  }

  /**
   * Confirm delete with password
   * @param {Event} event Password submit event
   */
  function submit(event) {
    event.preventDefault();
    onSubmit(password);
    setStartedTyping(false);
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
              className={isInvalid && !startedTyping && "is-invalid"}
              type="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Invalid Password
            </Form.Control.Feedback>
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
