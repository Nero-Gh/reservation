import "./Modal.css";
import React,{useState} from "react";
import Success from "./Success";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';




const ModalPayment = ()=> {

    const [open, setOpen] = useState(true);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  return (
    <div class="content">
    {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={onCloseModal} center>
      <div className="main-container">
        <div className="check-container popup-inner">
          <p className="verify-head" style={{color:"black",background:"black",padding:"0 10px"}}>Verifying Payment</p>
          <p className="wait-div"style={{color:"black",background:"black",padding:"0 10px"}} >Please wait</p>
          <Success />
        </div>
        <div className="check-shadow"></div>
      </div>
      </Modal>
     
    </div>
  );
}

export default ModalPayment