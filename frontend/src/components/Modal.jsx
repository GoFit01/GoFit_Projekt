import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
  text-align: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 10px;
`;

const ModalButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Modal = ({ message, onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalHeader>Gofit Közlendője</ModalHeader>
      <p>{message}</p>
      <ModalButton onClick={onClose}>Bezárás</ModalButton>
    </ModalContent>
  </ModalOverlay>
);

export default Modal;