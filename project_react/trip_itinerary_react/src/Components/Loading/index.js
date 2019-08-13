import React from 'react';
import { Button, Modal} from 'react-bootstrap';

function Loading(props) {
    // const [show, setShow] = useState(false);
  
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    const {isLoading} = props;
    return (
      <>  
        <Modal show={isLoading}>
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default Loading