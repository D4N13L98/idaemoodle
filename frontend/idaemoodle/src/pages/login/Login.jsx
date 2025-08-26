import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Modal from "../../components/Modal.jsx";

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #ff0000ff, #717171ff, #000000ff);
  background-size: 400% 400%;
  animation: ${gradient} 12s ease infinite;
  font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2.8rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 420px;
  text-align: center;
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1.5rem;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  padding: 0.7rem 0.5rem;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  &:focus-within {
    background: rgba(255, 255, 255, 0.2);
    border-bottom: 1.5px solid #fff;
  }

  svg {
    margin-right: 0.8rem;
    color: #fff;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    font-size: 1rem;
    color: #fff;

    &::placeholder {
      color: #ddd;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    transform: scale(1.05);
  }
`;

const Login = () => {
  const [userType, setUserType] = useState("");
  const [grade, setGrade] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (grade === "" || id === "" || userType === "") {
      setMessage("Para continuar debe ingresar sus credenciales");
      setIsModalOpen(true);
    } else {
      if (userType === "Estudiante") {
        const userId = await fetch(
          `https://idaemoodle.onrender.com/idaemoodle/students/searchStudent/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await userId.json();
        console.log(data)
        if (data.message === "Usuario encontrado") {
          if (data.data.grade === grade) {
            setMessage(
              `Ha ingresado correctamente, bienvenido/a ${data.data.name}`
            );
            setIsModalOpen(true);
            setTimeout(() => {
              sessionStorage.setItem("student", JSON.stringify(data.data)); // guardamos
              navigate("/dashboards", { state: { student: data.data } }); // pasamos por state
            }, 2500);
          } else {
            setMessage(`El código no corresponde al curso ${grade}`);
            setIsModalOpen(true);
          }
        } else {
          setMessage(
            "No se encontró ningún estudiante registrado con este código"
          );
          setIsModalOpen(true);
        }
      } else if (userType === "Profesor") {
        const teacherId = await fetch(
          `https://idaemoodle.onrender.com/idaemoodle/teachers/searchTeacher/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await teacherId.json();
        if (data.message === "Usuario encontrado") {
          if (data.data.id === Number(id)) {
            setMessage(
              `Bienvenido, ingresó correctamente como: ${data.data.name} docente de: ${data.data.subject}`
            );
            setIsModalOpen(true);
            setIsModalOpen(true);
            setTimeout(() => {
              sessionStorage.setItem("teacher", JSON.stringify(data.data)); // guardamos
              navigate("/dashboardt", { state: { teacher: data.data } }); // pasamos por state
            }, 2500);
          } else {
            setMessage(`No coincide la contraseña`);
            setIsModalOpen(true);
          }
        } else {
          setMessage("No se encontró ningún profesor registrado con este id");
          setIsModalOpen(true);
        }
      } else {
        setMessage("Agrega un tipo de usuario correcto");
        setIsModalOpen(true);
      }
    }
  };

  return (
    <Container>
      <Card>
        <Logo
          src="http://www.adescolares.com.co/idaesaet/uploads/img_57d116bc6c7f56.14447985.jpg"
          alt="Logo IDAE"
        />
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <input
              list="userType"
              placeholder="Tipo de usuario"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            />
            <datalist id="userType">
              <option value="Profesor" />
              <option value="Estudiante" />
            </datalist>
          </InputGroup>
          {userType === "Profesor" && (
            <>
              <InputGroup>
                <FaUser />
                <input
                  type="number"
                  placeholder="Documento de identifiación"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <FaLock />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </InputGroup>
              <Button type="submit">Ingresar</Button>
            </>
          )}
          {userType === "Estudiante" && (
            <>
              <InputGroup>
                <FaUser />
                <input
                  type="number"
                  placeholder="Curso"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <FaLock />
                <input
                  type="number"
                  placeholder="Código"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </InputGroup>
              <Button type="submit">Ingresar</Button>
            </>
          )}
        </form>
      </Card>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          message={message}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Login;
