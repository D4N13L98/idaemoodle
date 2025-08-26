import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import LogOutModal from "../../components/LogOutModal";

const RED = "#FF4861";
const GRAY = "#5A5A5A";
const BLACK = "#000000";
const BG = "#F5F6F8";

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${BG};
  font-family: "Poppins", system-ui, sans-serif;
`;

const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${RED};
  color: #fff;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;

  .title {
    display: flex;
    align-items: center;
    font-weight: 700;
    letter-spacing: 0.3px;
    gap: 10px;

    img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;

  img {
    height: 35px;
    margin-right: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;
`;

const StudentName = styled.p`
  margin: 0;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: grid;
  place-items: center;
  font-weight: 700;
`;

const LogoutText = styled.p`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.3s;
  margin: 0;

  .icon {
    font-size: 14px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.main`
  max-width: 1100px;
  margin: 22px auto;
  padding: 0 18px 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.section`
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);

  h4 {
    margin: 0 0 8px;
    font-size: 0.95rem;
    font-weight: 600;
    color: ${GRAY};
  }

  .value {
    font-size: 1.8rem;
    font-weight: 800;
    color: ${BLACK};
    margin-bottom: 10px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const EvalName = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 600;
  padding: 0 1rem;

  .badge {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(180deg, #ffd3da, #ffe7ea);
    border: 1px solid #ffd0d7;
    display: grid;
    place-items: center;
    color: ${RED};
    font-weight: 800;
  }
`;

const FieldSet = styled.fieldset`
  width: 100%;
  padding: 0;
  margin; 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  font-weight: 500;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Activa scroll horizontal si la tabla es muy ancha */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  text-align: center;
  border: none;
`;

const Th = styled.th`
  padding: 10px;
  background-color: ${RED};
  color: white;
`;

const Td = styled.td`
  padding: 10px;
`;

const ActionBtn = styled.button`
  margin-top: 10px;
  background: ${RED};
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${BLACK};
  }
`;

const BarWrap = styled.div`
  background: #eee;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
`;

const Bar = styled.div`
  width: ${({ percent }) => `${Math.min(100, Math.max(0, percent))}%`};
  height: 100%;
  background: ${RED};
  transition: width 0.3s ease-in-out;
`;

const initials = (name = "") => {
  const parts = name.split(" ").filter(Boolean);
  const firstLastName = parts[0]?.[0]?.toUpperCase() || "";
  const firstName = parts[2]?.[0]?.toUpperCase() || "";
  return firstLastName + firstName || "?";
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notasFormateadas, setNotasFormateadas] = useState(null);
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [inProgressAssessments, setInProgressAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [studentAttemptedCodes, setStudentAttemptedCodes] = useState(new Set());

  useEffect(() => {
    // Primero intento obtener el usuario de location.state
    let userFromState = location.state?.student;

    if (userFromState) {
      // Si viene por state, actualizo estado y guardo en sessionStorage
      setStudent(userFromState);
      sessionStorage.setItem("student", JSON.stringify(userFromState));
      setLoading(false);
    } else {
      // Si no viene por state, intento cargar del sessionStorage
      const userFromSession = JSON.parse(sessionStorage.getItem("student"));
      if (userFromSession) {
        setStudent(userFromSession);
        setLoading(false);
      } else {
        // Si no hay usuario, redirijo a login
        navigate("/", { replace: true });
      }
    }
  }, [location.state, navigate]);

  useEffect(() => {
  if (!student) return; // Evita ejecutar si student es null o undefined

  const fetchData = async () => {
    try {
      // 1. Traer intentos
      const attemptsRes = await fetch(
        "http://localhost:5000/idaemoodle/attempts/searchAttempts/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!attemptsRes.ok) throw new Error("Error al traer intentos");
      const attemptsData = await attemptsRes.json();
      const allAttempts = attemptsData.data;

      // 2. Filtrar intentos del estudiante actual
      const studentAttempts = allAttempts.filter(
        (a) => a.studentId === student.id
      );

      setStudentAttemptedCodes(
        new Set(studentAttempts.map((a) => a.assessmentId))
      );

      // 3. Traer evaluaciones
      const assessmentsRes = await fetch(
        "http://localhost:5000/idaemoodle/assessments/searchAssessments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!assessmentsRes.ok) throw new Error("Error al traer assessments");

      const assessmentsData = await assessmentsRes.json();
      const assessmentsGrade = assessmentsData.data.filter(
        (assessment) => assessment.grade === student.grade
      );

      const assessmentsStudent = assessmentsGrade.filter((assessment) => {
        if (!assessment.targetAudience || assessment.targetAudience.length === 0) {
          return true;
        } else {
          return assessment.targetAudience.includes(String(student.id));
        }
      });

      organizeAssessmentsByDate(assessmentsStudent);

      // 4. Procesar notas
      const grupos = {};
      allAttempts.forEach((a) => {
        if (a.group != null && a.groupAllow) {
          const groupKey = Number(a.group);
          if (!grupos[groupKey]) grupos[groupKey] = [];
          grupos[groupKey].push(a);
        }
      });

      const notas = {
        id: student.id,
        name: student.name,
        V1: { individual: "-", group: "-" },
        V2: { individual: "-", group: "-" },
        V3: { individual: "-", group: "-" },
        V4: { individual: "-", group: "-" },
      };

      studentAttempts.forEach((attempt) => {
        const tipo = attempt.assessmentType;
        const score = attempt.score;

        if (notas[tipo]) {
          notas[tipo].individual = score;

          // Solo asignar nota grupal directa si NO es grupal
          if (!attempt.groupAllow) {
            notas[tipo].group = score;
          }
        }
      });

      // Calcular promedios grupales
      Object.keys(notas).forEach((tipo) => {
        if (notas[tipo].group === "-") {
          const groupAttempt = studentAttempts.find(
            (a) => a.assessmentType === tipo && a.groupAllow
          );
          if (groupAttempt) {
            const grupo = Number(groupAttempt.group);
            if (!grupo || !grupos[grupo]) return;
            const intentosGrupo = grupos[grupo]?.filter(
              (a) => a.assessmentType === tipo
            );

            if (intentosGrupo && intentosGrupo.length > 0) {
              const promedio =
                intentosGrupo.reduce((sum, a) => sum + a.score, 0) /
                intentosGrupo.length;
              notas[tipo].group = parseFloat(promedio.toFixed(2));
            }
          }
        }
      });
      setNotasFormateadas(notas);
    } catch (error) {
      console.error("Error al traer datos:", error);
    }
  };

  fetchData();
}, [student, studentAttemptedCodes]);


  const handleGo = (assessment) => {
    navigate("/assessments", { state: { student, assessment } });
  };

  const formatDate = (startDate, endDate) => {
    const startDateFormated = new Date(startDate).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const endDateFormated = new Date(endDate).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (startDateFormated === endDateFormated) {
      return startDateFormated;
    } else {
      return `${startDateFormated} - ${endDateFormated}`;
    }
  };

  const formatHour = (startDate, endDate) => {
    const startDateToFormat = new Date(startDate).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endDateToFormat = new Date(endDate).toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${startDateToFormat} - ${endDateToFormat}`;
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    sessionStorage.clear(); // Limpia todo el sessionStorage
    localStorage.removeItem("token"); // Limpia token (si usas)

    setTimeout(() => {
      navigate("/", { replace: true }); // Redirige a login
    }, 100);
  };

  const formatScore = (value) =>
    typeof value === "number" ? value.toFixed(1) : "-";

  const formatName = (name = "") =>
    name
      .toLowerCase()
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(" ");

  const organizeAssessmentsByDate = (assessments = []) => {
    const now = new Date();

    const available = [];
    const inProgress = [];
    const completed = [];

    assessments.forEach((assessment) => {
      const start = new Date(assessment.startsAt);
      const end = new Date(assessment.endsAt);

      if (now < start) {
        available.push(assessment);
      } else if (now >= start && now <= end) {
        inProgress.push(assessment);
      } else {
        completed.push(assessment);
      }
    });

    setAvailableAssessments(available);
    setInProgressAssessments(inProgress);
    setCompletedAssessments(completed);
  };

  const totalValoraciones = 4;
  const completadas = completedAssessments.length;
  const porcentajeCompletado = (completadas / totalValoraciones) * 100;

  if (loading) {
    return (
      <Wrapper>
        <Topbar>
          <Title>
            <img
              src="http://www.adescolares.com.co/images/logo-adesco.png"
              alt="Logo"
            />
            IDAE • Dashboard
          </Title>

          <RightSection>
            {student && (
              <>
                <StudentInfo>
                  <StudentName>{formatName(student.name || "")}</StudentName>
                  <LogoutText onClick={handleLogoutClick}>
                    <FaSignOutAlt className="icon" /> Cerrar sesión
                  </LogoutText>
                </StudentInfo>
                <Avatar>{initials(student.name || "")}</Avatar>
              </>
            )}
          </RightSection>
        </Topbar>
        <Content>
          <p>Cargando...</p>
        </Content>
      </Wrapper>
    );
  }

  // Si no está cargando, renderizamos el contenido principal
  return (
    <Wrapper>
      <Topbar>
        <Title>
          <img
            src="http://www.adescolares.com.co/images/logo-adesco.png"
            alt="Logo"
          />
          IDAE • Dashboard
        </Title>

        <RightSection>
          <StudentInfo>
            <StudentName>{formatName(student.name || "")}</StudentName>
            <LogoutText onClick={handleLogoutClick}>
              <FaSignOutAlt className="icon" /> Cerrar sesión
            </LogoutText>
          </StudentInfo>
          <Avatar>{initials(student.name || "")}</Avatar>
        </RightSection>
      </Topbar>
      <Content>
        <Grid>
          <StatCard>
            <h4>Evaluaciones disponibles</h4>
            <div className="value">{availableAssessments.length}</div>
          </StatCard>

          <StatCard>
            <h4>En curso</h4>
            <div className="value">{inProgressAssessments.length}</div>
          </StatCard>

          <StatCard>
            <h4>Completadas</h4>
            <div className="value">
              {completadas} de {totalValoraciones}
            </div>
            <BarWrap>
              <Bar percent={porcentajeCompletado} />
            </BarWrap>
          </StatCard>
        </Grid>

        <h3 style={{ margin: "28px 0 14px", fontWeight: "700", color: BLACK }}>
          Evaluaciones
        </h3>
        <Row className="d-flex flex-column gap-4 p-0">
          <FieldSet className="rounded-3">
            <Legend className="float-none w-auto px-1 rounded-2">
              🟡 No iniciadas
            </Legend>
            {availableAssessments.length === 0 ? (
              <Row style={{ gridTemplateColumns: "1fr" }}>
                <span style={{ fontStyle: "italic" }}>
                  No hay evaluaciones en curso
                </span>
              </Row>
            ) : (
              availableAssessments.map((a) => (
                <Row key={a.code} className="rounded-4 shadow-sm bg-white">
                  <EvalName>
                    <div className="badge">V</div>
                    <div>
                      <div style={{ fontWeight: 800 }}>{a.name}</div>
                      <small style={{ color: RED }}>{a.topic}</small>
                      <br />
                      <small style={{ color: GRAY }}>
                        {a.questionsQuantity} preguntas
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Duración: {a.durationMinutes} min
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Fecha de prueba: {formatDate(a.startsAt, a.endsAt)}
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Hora de prueba: {formatHour(a.startsAt, a.endsAt)}
                      </small>
                    </div>
                  </EvalName>
                </Row>
              ))
            )}
          </FieldSet>
          <FieldSet className="rounded-3">
            <Legend className="float-none w-auto px-1 rounded-2">
              🟢 Disponibles
            </Legend>
            {inProgressAssessments.length === 0 ? (
              <Row style={{ gridTemplateColumns: "1fr" }}>
                <span style={{ fontStyle: "italic" }}>
                  No hay evaluaciones disponibles
                </span>
              </Row>
            ) : (
              inProgressAssessments.map((a) => {
                const yaRealizada = studentAttemptedCodes.has(a.code);
                return (
                  <Row key={a.code} className="rounded-4 shadow-sm bg-white">
                    <EvalName>
                      <div className="badge">V</div>
                      <div>
                        <div style={{ fontWeight: 800 }}>{a.name}</div>
                        <small style={{ color: RED }}>{a.topic}</small>
                        <br />
                        <small style={{ color: GRAY }}>
                          {a.questionsQuantity} preguntas
                        </small>
                        <br />
                        <small style={{ color: GRAY }}>
                          Duración: {a.durationMinutes} min
                        </small>
                        <br />
                        <small style={{ color: GRAY }}>
                          Fecha de prueba: {formatDate(a.startsAt, a.endsAt)}
                        </small>
                        <br />
                        <small style={{ color: GRAY }}>
                          Hora de prueba: {formatHour(a.startsAt, a.endsAt)}
                        </small>
                      </div>
                    </EvalName>

                    {!yaRealizada && (
                      <ActionBtn onClick={() => handleGo(a)}>Empezar</ActionBtn>
                    )}
                  </Row>
                );
              })
            )}
          </FieldSet>
          <FieldSet className="rounded-3">
            <Legend className="float-none w-auto px-1 rounded-2">
              🔴 Completadas
            </Legend>
            {completedAssessments.length === 0 ? (
              <Row style={{ gridTemplateColumns: "1fr" }}>
                <span style={{ fontStyle: "italic" }}>
                  No hay evaluaciones completadas
                </span>
              </Row>
            ) : (
              completedAssessments.map((a) => (
                <Row key={a.code} className="rounded-4 shadow-sm bg-white">
                  <EvalName>
                    <div className="badge">V</div>
                    <div>
                      <div style={{ fontWeight: 800 }}>{a.name}</div>
                      <small style={{ color: RED }}>{a.topic}</small>
                      <br />
                      <small style={{ color: GRAY }}>
                        {a.questionsQuantity} preguntas
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Duración: {a.durationMinutes} min
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Fecha de prueba: {formatDate(a.startsAt, a.endsAt)}
                      </small>
                      <br />
                      <small style={{ color: GRAY }}>
                        Hora de prueba: {formatHour(a.startsAt, a.endsAt)}
                      </small>
                    </div>
                  </EvalName>
                  <ActionBtn
                    onClick={() =>
                      navigate("/result", {
                        state: { assessment: a },
                      })
                    }>
                    Ver resultado
                  </ActionBtn>
                </Row>
              ))
            )}
          </FieldSet>
        </Row>

        <h3 style={{ margin: "32px 0 14px", fontWeight: "700", color: BLACK }}>
          Mis notas
        </h3>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th rowSpan="2">Código</Th>
                <Th rowSpan="2">Nombre</Th>
                <Th colSpan="2" title="Funciones oxigenadas - Parte 1">
                  Valoración 1
                </Th>
                <Th colSpan="2" title="Funciones oxigenadas - Parte 2">
                  Valoración 2
                </Th>
                <Th colSpan="2" title="Funciones nitrogenadas">
                  Valoración 3
                </Th>
                <Th colSpan="2" title="Funciones azufradas">
                  Valoración 4
                </Th>
              </tr>
              <tr>
                <Th>Indiv</Th>
                <Th>Grupo</Th>
                <Th>Indiv</Th>
                <Th>Grupo</Th>
                <Th>Indiv</Th>
                <Th>Grupo</Th>
                <Th>Indiv</Th>
                <Th>Grupo</Th>
              </tr>
            </thead>
            <tbody>
              {notasFormateadas ? (
                <tr>
                  <Td>{notasFormateadas.id}</Td>
                  <Td>{notasFormateadas.name}</Td>

                  <Td>{formatScore(notasFormateadas.V1.individual)}</Td>
                  <Td>{formatScore(notasFormateadas.V1.group)}</Td>

                  <Td>{formatScore(notasFormateadas.V2.individual)}</Td>
                  <Td>{formatScore(notasFormateadas.V2.group)}</Td>

                  <Td>{formatScore(notasFormateadas.V3.individual)}</Td>
                  <Td>{formatScore(notasFormateadas.V3.group)}</Td>

                  <Td>{formatScore(notasFormateadas.V4.individual)}</Td>
                  <Td>{formatScore(notasFormateadas.V4.group)}</Td>
                </tr>
              ) : (
                <tr>
                  <Td colSpan="10">Cargando notas...</Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Content>
      {isModalOpen && (
        <LogOutModal
          IsModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          confirmLogout={confirmLogout}
        />
      )}
    </Wrapper>
  );
};

export default Dashboard;
