import React from 'react';
import { Button, Modal} from 'react-bootstrap';

function Loading(props) {
    // const [show, setShow] = useState(false);
  
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    const {isLoading} = props;
    return (
      <>  
        <Modal show={isLoading} className="loading" >
          <Modal.Header >
            <Modal.Title>Please wait ... </Modal.Title>
          </Modal.Header>
          <Modal.Body>We are generating your itinerary</Modal.Body>
        </Modal>
      </>
 
      );
  }
  
  export default Loading