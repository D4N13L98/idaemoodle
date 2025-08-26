import { useState, useEffect, useMemo, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal.jsx";

/* === Styles === */
const BG = "#F5F6F8";

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  min-height: 100vh;
  background-size: 400% 400%;
  animation: ${gradient} 18s ease infinite;
  font-family: "Poppins", sans-serif;
  padding-top: 70px;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0.5%;
  width: 99%;
  background: rgba(255, 72, 97, 1);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-radius: 0 0 20px 20px;
  flex-wrap: nowrap; /* desktop normal */

  h3 {
    white-space: nowrap; /* evita que el título se parta */
    font-size: 1.5rem;
    margin: 0;
  }

  div {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
    h3 {
      font-size: 1.3rem;
    }
    div {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    padding: 1rem 1rem;
    gap: 0.5rem;

    h3 {
      flex-basis: 100%;
      text-align: center;
      font-size: 1.2rem;
    }

    div {
      flex-basis: 100%;
      text-align: right;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 360px) {
    div {
      flex-basis: 100%;
      text-align: center;
      font-size: 0.85rem;
      margin-top: 5px;
    }
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const OptionSelect = styled.option`
  padding: 10px 5px;
  background: ${BG};
`;

const Card = styled.div`
  background: white;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;

  @media (max-width: 768px) {
    margin: 2rem 20px;
    padding: 1.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    margin: 3rem 14px;
    padding: 1rem 1rem 1.2rem 1rem;
  }
`;

const Question = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(66, 66, 66, 0.15);
  border-radius: 15px;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    margin-bottom: 1.5rem;
  }
`;

const QImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  display: block;
  margin: 15px auto;
  border-radius: 8px;
  object-fit: contain;

  @media (max-width: 480px) {
    max-height: 180px;
  }
`;

const QText = styled.p`
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.3;
  }
`;

const Options = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(155, 155, 155, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 72, 96, 0.6);
  }

  input {
    accent-color: rgba(255, 72, 97, 1);
    min-width: 18px;
    min-height: 18px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 0.9rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  margin: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  background: rgba(255, 72, 97, 1);
  color: #000;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    background: linear-gradient(45deg, #5a5a5a, #000);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    min-width: 100%;
    margin: 0.3rem 0;
  }
`;

const TimerText = styled.span`
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 480px) {
    display: block;
    margin-bottom: 5px;
    font-size: 0.85rem;
  }
`;

const generateCode = (studentId, assessmentId) =>
  `${studentId}-${assessmentId}`;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const formatterDate = (date) => {
  const d = new Date(date);
  return `${d.toLocaleDateString("es-CO")} - ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const Assessments = () => {
  const { state } = useLocation();
  const student = useMemo(
    () => state.student || { name: "Estudiante" },
    [state]
  );
  const assessment = useMemo(() => state?.assessment ?? null, [state]);

  const [questions, setQuestions] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [groups, setGroups] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tiempo, setTiempo] = useState(assessment.durationMinutes * 60);
  const [attemptData, setAttemptData] = useState(null);
  const [message, setMessage] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `https://idaemoodle.onrender.com/idaemoodle/questions/searchQuestions/${assessment.topic}`
        );
        if (!res.ok) throw new Error("Error en la petición");

        const data = await res.json();
        const shuffled = data.data.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, assessment.questionsQuantity);
        const ids = selected.map((q) => q.id);

        setQuestions(selected);
        setAttemptData({
          attemptId: generateCode(student.id, assessment.code),
          assessmentId: assessment.code,
          groupAllow: assessment.groupAllow,
          group: groups,
          assessmentType: assessment.assessment,
          studentId: student.id,
          grade: student.grade,
          startedAt: new Date().toISOString(),
          submittedAt: "",
          timeSpentSec: 0,
          questionsOrder: ids,
          responses: [],
          score: 0,
          maxScore: assessment.questionsQuantity,
        });
      } catch (err) {
        console.error("Error al cargar preguntas:", err);
      }
    };

    fetchQuestions();
  }, [assessment, student, groups]);

  useEffect(() => {
    if (tiempo <= 0) return;
    const timer = setInterval(() => setTiempo((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [tiempo]);

  useEffect(() => {
    const anularIntento = async () => {
      if (alreadySubmitted || !attemptData) return;

      const intentoAnulado = {
        ...attemptData,
        submittedAt: new Date().toISOString(),
        timeSpentSec: assessment.durationMinutes * 60 - tiempo,
        responses: [],
        score: 1,
      };

      try {
        const res = await fetch(
          "https://idaemoodle.onrender.com/idaemoodle/attempts/createAttempt",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(intentoAnulado),
          }
        );

        const resText = await res.text();
        let data;

        try {
          data = JSON.parse(resText);
        } catch (e) {
          setMessage("Error al anular intento. Respuesta inválida.");
          setIsModalOpen(true);
          return;
        }

        if (res.ok && data.message === "Evaluación creada exitosamente") {
          setMessage(
            "Tu intento ha sido anulado por cambiar de pestaña o minimizar."
          );
        } else {
          setMessage(data.message || "Error al anular el intento.");
        }
      } catch (error) {
        setMessage("No se pudo anular el intento. Revisa tu conexión.");
      } finally {
        setAlreadySubmitted(true);
        setIsModalOpen(true);

        setTimeout(() => {
          navigate("/dashboards", { state: { student, assessment } });
        }, 3000);
      }
    };

    const handleBlur = () => {
      anularIntento();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        anularIntento();
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [alreadySubmitted, attemptData, tiempo, navigate, student, assessment]);

  const enviarIntentoTiempoAgotado = useCallback(async () => {
    let aciertos = 0;

    const responseList = questions.map((q) => {
      const selected = respuestas[q.id];
      const correct = q.answer;

      if (selected !== undefined && parseInt(selected) === correct) {
        aciertos++;
      }
      return {
        questionId: q.id,
        selectedAnswer: selected !== undefined ? selected : null,
        correctAnswer: correct,
      };
    });

    const finalScore = parseFloat(
      ((aciertos / questions.length) * 10).toFixed(2)
    );

    const updatedAttempt = {
      ...attemptData,
      submittedAt: new Date().toISOString(),
      timeSpentSec: assessment.durationMinutes * 60,
      responses: responseList,
      score: finalScore,
    };

    try {
      const res = await fetch(
        "https://idaemoodle.onrender.com/idaemoodle/attempts/createAttempt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAttempt),
        }
      );

      const resText = await res.text();
      let data;

      try {
        data = JSON.parse(resText);
      } catch (e) {
        setMessage("Error: El servidor devolvió una respuesta inválida.");
        setIsModalOpen(true);
        return;
      }

      if (!res.ok) {
        setMessage(data.message || "Error inesperado al enviar el intento.");
        setIsModalOpen(true);
        return;
      }

      setMessage(
        `${student.name}, se acabó el tiempo. Se enviaron tus respuestas. Tu puntaje fue ${finalScore}/${assessment.questionsQuantity}`
      );
    } catch (error) {
      setMessage(
        "Ocurrió un error al enviar el intento tras agotarse el tiempo. Inténtalo nuevamente."
      );
    } finally {
      setIsModalOpen(true);

      setTimeout(() => {
        navigate("/dashboards", { state: { student, assessment } });
      }, 4000);
    }
  }, [
    questions,
    respuestas,
    attemptData,
    assessment,
    student,
    navigate,
    setIsModalOpen,
    setMessage,
  ]);

  useEffect(() => {
    if (tiempo === 0) {
      enviarIntentoTiempoAgotado();
    }
  }, [tiempo, enviarIntentoTiempoAgotado]);

  const loadData = (e) => {
    setGroups(e.target.value);
  };

  const handleSelectAnswer = (questionId, selectedAnswer, correctAnswer) => {
    setRespuestas((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));

    setAttemptData((prev) => ({
      ...prev,
      responses: [
        ...prev.responses.filter((r) => r.questionId !== questionId),
        { questionId, selectedAnswer, correctAnswer },
      ],
    }));
  };

  const validarRespuestas = () => {
    if (assessment.groupAllow && !groups) {
      setMessage("Por favor, seleccione un grupo antes de enviar la prueba.");
      setIsModalOpen(true);
      return;
    }
    if (tiempo === 0) {
      // Tiempo agotado, no mostrar alerta por respuestas incompletas, simplemente enviar
      enviarIntentoTiempoAgotado();
      return;
    }
    const unanswered = questions.filter((q) => !(q.id in respuestas));
    if (unanswered.length > 0) {
      setMessage("Debes responder todas las preguntas");
      setIsModalOpen(true);
      return;
    }
    corregir();
  };

  const corregir = async () => {
    let aciertos = 0;

    const responseList = questions.map((q) => {
      const selected = respuestas[q.id];
      const correct = q.answer;
      if (parseInt(selected) === correct) aciertos++;
      return {
        questionId: q.id,
        selectedAnswer: selected,
        correctAnswer: correct,
      };
    });

    const finalScore = parseFloat(
      ((aciertos / questions.length) * 10).toFixed(2)
    );

    const updatedAttempt = {
      ...attemptData,
      submittedAt: new Date().toISOString(),
      timeSpentSec: assessment.durationMinutes * 60 - tiempo,
      responses: responseList,
      score: finalScore,
    };
    console.log("Intento a enviar:", updatedAttempt);

    try {
      const res = await fetch(
        "https://idaemoodle.onrender.com/idaemoodle/attempts/createAttempt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAttempt),
        }
      );

      const resText = await res.text();

      let data;
      try {
        data = JSON.parse(resText);
      } catch (e) {
        setMessage("Error: El servidor devolvió una respuesta inválida.");
        setIsModalOpen(true);
        return;
      }

      if (!res.ok) {
        setMessage(data.message || "Error inesperado al enviar el intento.");
        setIsModalOpen(true);
        return;
      }

      if (data.message === "Ya realizaste esta evaluación") {
        setMessage(data.message);
      } else if (data.message === "Evaluación creada exitosamente") {
        setMessage(
          `${student.name}, tus respuestas se han enviado. Tu puntaje fue ${finalScore}/${assessment.questionsQuantity}`
        );
        navigate("/dashboards", { state: { student } });
      } else {
        setMessage("Respuesta inesperada del servidor.");
      }
    } catch (error) {
      setMessage(
        "Ocurrió un error al enviar el intento. Inténtalo nuevamente."
      );
    } finally {
      setIsModalOpen(true);
    }
  };

  const borrar = () => {
    setRespuestas({});
  };

  return (
    <Container>
      <Navbar>
        <h3>Evaluación Interactiva</h3>
        <div>
          <TimerText>⏱ {formatTime(tiempo)}</TimerText> | 👋 {student.name}
        </div>
      </Navbar>

      <Card>
        <h2>{assessment.name}</h2>

        {assessment.groupAllow && (
          <Question>
            <QText>Indique a qué grupo pertenece:</QText>
            <Select
              value={groups}
              onChange={loadData}
              disabled={Object.keys(respuestas).length > 0}>
              <OptionSelect value="">Seleccione un grupo</OptionSelect>
              {[...Array(Number(assessment.groups))].map((_, i) => (
                <OptionSelect key={i} value={(i + 1).toString()}>
                  Grupo {i + 1}
                </OptionSelect>
              ))}
            </Select>
          </Question>
        )}

        <Question>
          <QText>
            <strong>Código intento:</strong> {attemptData?.attemptId}
          </QText>
          <QText>
            <strong>Tema:</strong> {assessment.topic}
          </QText>
          <QText>
            <strong>Duración:</strong> {assessment.durationMinutes} min
          </QText>
          <QText>
            <strong>Inicia:</strong> {formatterDate(assessment.startsAt)}
          </QText>
          <QText>
            <strong>Finaliza:</strong> {formatterDate(assessment.endsAt)}
          </QText>
          <QText>
            <strong>Instrucciones:</strong> {assessment.instructions}
          </QText>
        </Question>

        {questions.map((q) => (
          <Question key={q.id}>
            {q.imagen && <QImage src={q.imagen} alt="Imagen de la pregunta" />}
            <Options>
              {q.opciones.map((op, i) => (
                <Option key={i}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={i}
                    checked={respuestas[q.id] === i}
                    onChange={() => handleSelectAnswer(q.id, i, q.answer)}
                  />
                  {op}
                </Option>
              ))}
            </Options>
          </Question>
        ))}

        <ButtonWrapper>
          <Button onClick={validarRespuestas}>Enviar respuesta</Button>
          <Button onClick={borrar}>Borrar</Button>
        </ButtonWrapper>
      </Card>

      {isModalOpen && (
        <Modal
          message={message}
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      )}
    </Container>
  );
};

export default Assessments;
