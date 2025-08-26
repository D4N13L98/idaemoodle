import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  width: 350px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 480px) {
    width: 90%;
    padding: 18px 15px;
  }
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Button = styled.button`
  background: #e63946;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  min-width: 120px;
  transition: background 0.3s ease;

  &:hover {
    background: #b22222;
  }

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const Modal = ({isOpen, closeModal, message}) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <ModalActions>
          <Button onClick={closeModal}>
            Entendido
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
