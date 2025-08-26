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
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const CancelButton = styled.button`
  background: #ccc;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  min-width: 120px;

  &:hover {
    background: #bbb;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 10px 0;
  }
`;

const ConfirmButton = styled.button`
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  min-width: 120px;

  &:hover {
    background: #b22222;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 10px 0;
  }
`;

const LogOutModal = ({ IsModalOpen, setIsModalOpen, confirmLogout }) => {
  if (!IsModalOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>¿Seguro que quieres cerrar sesión?</ModalMessage>
        <ModalActions>
          <CancelButton onClick={() => setIsModalOpen(false)}>
            Cancelar
          </CancelButton>
          <ConfirmButton onClick={confirmLogout}>Sí, salir</ConfirmButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogOutModal;
