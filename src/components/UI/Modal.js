import React from "react";

import styles from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <div>
      <BackDrop />
      <ModalOverlay>{props.children}</ModalOverlay>,
    </div>
  );
};

export default Modal;
