import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import LogOutModal from "../../components/LogOutModal";
import Modal from "../../components/Modal";

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

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;
`;

const UserName = styled.p`
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

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.main`
  max-width: 1100px;
  margin: 22px auto;
  padding: 0 18px 28px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #333333;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: "Work Sans", sans-serif;
  font-size: 14px;
  border-color: #d2d2d2ff;
  cursor: pointer;
  padding: 15px;

  &:hover {
    border-color: ${RED};
  }

  &:focus {
    border-color: ${RED};
    box-shadow: 1px 0 2px ${RED};
  }
`;

const Option = styled.option`
  font-size: 14px;
  padding: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

const FormContainer = styled.form`
  width: 100%;
  margin-top: 20px;
  padding: 25px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;
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

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #0b3e32;
  }
`;

const Textarea = styled.textarea`
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 0.95rem;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border 0.2s ease;

  &:focus {
    border-color: #0b3e32;
  }
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-top: 10px;
`;

const StudentsContainer = styled.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
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
  justify-self: end;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background: ${RED};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.15s ease;
  &:hover {
    transform: translateY(-1px);
  }
`;

const initials = (name = "") => {
  const parts = name.split(" ").filter(Boolean);
  const firstLastName = parts[0]?.[0]?.toUpperCase() || "";
  const firstName = parts[2]?.[0]?.toUpperCase() || "";
  return firstLastName + firstName || "?";
};

const DashboardProfesor = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chooseStudents, setChooseStudents] = useState(false);
  const [isCreatedModal, setIsCreatedModal] = useState(false);
  const [grade, setGrade] = useState("");
  const [stuCount, setStuCount] = useState([]);
  const [assessmentExist, setAssessmentExist] = useState([]);
  const [addAssessment, setAddAssessment] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    code: "",
    name: "",
    assessment: "",
    topic: "",
    subject: "", // vacío inicialmente
    grade: "",
    teacherId: 0, // cero inicialmente
    instructions: "",
    questionsQuantity: 0,
    startsAt: "",
    endsAt: "",
    durationMinutes: "",
    attemptLimit: 1,
    targetAudience: [],
    groupAllow: false,
    group: 0,
  });
  const [notasPorCurso, setNotasPorCurso] = useState({});
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [inProgressAssessments, setInProgressAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);

  useEffect(() => {
    let userFromState = location.state?.teacher;
    console.log("location.state?.teacher:", userFromState);

    if (userFromState) {
      setTeacher(userFromState);
      sessionStorage.setItem("teacher", JSON.stringify(userFromState));
      setLoading(false);
    } else {
      const userFromSession = JSON.parse(sessionStorage.getItem("teacher"));
      console.log("sessionStorage teacher:", userFromSession);

      if (userFromSession) {
        setTeacher(userFromSession);
        setLoading(false);
      } else {
        console.log("No teacher found, redirecting...");
        navigate("/", { replace: true });
      }
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (teacher) {
      setAssessmentData((prev) => ({
        ...prev,
        subject: teacher.subject,
        teacherId: Number(teacher.id),
        grade: grade,
      }));
    }
  }, [teacher, grade]);

  useEffect(() => {
    if (!grade) return;

    async function fetchData() {
      try {
        // 1. Traer estudiantes del curso
        const resStu = await fetch(
          "http://localhost:5000/idaemoodle/students/searchStudents"
        );
        const dataStu = await resStu.json();
        const students = dataStu.data.filter((s) => s.grade === grade);
        setStuCount(students);

        // 2. Traer intentos
        const resAtt = await fetch(
          "http://localhost:5000/idaemoodle/attempts/searchAttempts/"
        );
        const dataAtt = await resAtt.json();
        const allAttempts = dataAtt.data;

        // 3. Inicializar notas por estudiante
        const notasMap = {};
        students.forEach((s) => {
          notasMap[s.id] = {
            id: s.id,
            name: s.name,
            V1: { individual: "-", group: "-" },
            V2: { individual: "-", group: "-" },
            V3: { individual: "-", group: "-" },
            V4: { individual: "-", group: "-" },
          };
        });

        // 4. Agrupar intentos por grupo para promedios
        const grupos = {};
        allAttempts.forEach((a) => {
          if (a.group != null && a.groupAllow) {
            const gk = String(a.group);
            if (!grupos[gk]) grupos[gk] = [];
            grupos[gk].push(a);
          }
        });

        // 5. Asignar notas individuales y grupales
        allAttempts.forEach((a) => {
          const notas = notasMap[a.studentId];
          const tipo = a.assessmentType;
          if (notas && notas[tipo]) {
            notas[tipo].individual = a.score;
            if (!a.groupAllow) {
              notas[tipo].group = a.score;
            }
          }
        });

        // 6. Calcular promedios grupales si aplican
        Object.values(notasMap).forEach((notas) => {
          ["V1", "V2", "V3", "V4"].forEach((tipo) => {
            if (notas[tipo].group === "-") {
              const intentoGrupo = allAttempts.find(
                (a) =>
                  a.studentId === notas.id &&
                  a.assessmentType === tipo &&
                  a.groupAllow
              );
              if (intentoGrupo) {
                const gk = String(intentoGrupo.group);
                const grupArr = grupos[gk]?.filter(
                  (a) => a.assessmentType === tipo
                );
                if (grupArr && grupArr.length) {
                  const prom =
                    grupArr.reduce((sum, a) => sum + a.score, 0) /
                    grupArr.length;
                  notas[tipo].group = parseFloat(prom.toFixed(2));
                }
              }
            }
          });
        });

        setNotasPorCurso(notasMap);
      } catch (err) {
        console.error("Error al cargar datos profesor:", err);
      }
    }

    fetchData();
  }, [grade]);

  const initialAssessmentData = {
    code: "",
    name: "",
    assessment: 0,
    topic: "",
    subject: "",
    grade: grade,
    teacherId: "",
    instructions: "",
    questionsQuantity: 0,
    startsAt: "",
    endsAt: "",
    durationMinutes: "",
    attemptLimit: 1,
    targetAudience: [],
    groupAllow: false,
    group: 0,
  };

  const getAssessmentsByGrade = async (grade) => {
    try {
      const response = await fetch(
        "http://localhost:5000/idaemoodle/assessments/searchAssessments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();

      const assessmentsGrade = data.data.filter(
        (assessment) => assessment.grade === grade
      );
      return assessmentsGrade;
    } catch (error) {
      console.error("Error al traer las valoraciones:", error);
    }
  };

  const formatName = (name = "") =>
    name
      .toLowerCase()
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
      .join(" ");

  const loadData = async (e) => {
    const gradeSelect = e.target.value;
    setGrade(gradeSelect);
    const getAssessmentsByGradeData = await getAssessmentsByGrade(gradeSelect);
    setAssessmentExist(getAssessmentsByGradeData);
    organizeAssessmentsByDate(getAssessmentsByGradeData);
  };

  const generateCode = (grade) => {
    const now = new Date();
    const fecha =
      now.getFullYear().toString().slice(-2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const hora =
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    return `${grade}-${fecha}${hora}`;
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

  useEffect(() => {
    if (assessmentData.grade) {
      setAssessmentData((prev) => ({
        ...prev,
        code: generateCode(assessmentData.grade),
      }));
    }
  }, [assessmentData.grade]);

  const handleLogoutClick = () => setIsModalOpen(true);

  const handleAssessmentCreated = () => setIsCreatedModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxGroups = (e) => {
    const checked = e.target.checked;
    setAssessmentData((prev) => ({
      ...prev,
      groupAllow: checked,
      group: checked ? prev.group : 0,
    }));
  };

  const handleCheckboxStudents = (e) => {
    setChooseStudents(e.target.checked);

    if (!e.target.checked) {
      setAssessmentData((prev) => ({
        ...prev,
        targetAudience: [],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...assessmentData,
      groups: assessmentData.groupAllow ? assessmentData.groups : 0,
    };

    try {
      const res = await fetch(
        "http://localhost:5000/idaemoodle/assessments/createAssessment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!res.ok) {
        throw new Error("Error creando la evaluación");
      }

      setAddAssessment(!addAssessment);
      handleAssessmentCreated();
      setAssessmentData(initialAssessmentData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckboxChange = (code) => {
    setAssessmentData((prev) => {
      const alreadySelected = prev.targetAudience.includes(code);
      return {
        ...prev,
        targetAudience: alreadySelected
          ? prev.targetAudience.filter((c) => c !== code)
          : [...prev.targetAudience, code],
      };
    });
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    sessionStorage.clear(); // Limpia todo el sessionStorage
    localStorage.removeItem("token"); // Limpia token (si usas)

    setTimeout(() => {
      navigate("/", { replace: true }); // Redirige a login
    }, 100);
  };

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

  if (loading || !teacher) {
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
            {teacher && (
              <>
                <UserInfo>
                  <UserName>{formatName(teacher.name || "")}</UserName>
                  <LogoutText onClick={handleLogoutClick}>
                    <FaSignOutAlt className="icon" /> Cerrar sesión
                  </LogoutText>
                </UserInfo>
                <Avatar>{initials(teacher.name || "")}</Avatar>
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

  return (
    <Wrapper>
      <Topbar>
        <Title>
          <img
            src="http://www.adescolares.com.co/images/logo-adesco.png"
            alt="Logo"
          />
          IDAE • Panel Profesor
        </Title>
        <RightSection>
          <UserInfo>
            <UserName>{teacher.name}</UserName>
            <LogoutText onClick={handleLogoutClick}>
              <FaSignOutAlt /> Cerrar sesión
            </LogoutText>
          </UserInfo>
          <Avatar>{initials(teacher.name)}</Avatar>
        </RightSection>
      </Topbar>

      <Content>
        <h3 style={{ margin: "28px 0 14px", fontWeight: "700", color: BLACK }}>
          Curso
        </h3>
        <StatCard>
          <Select id="gradeSelect" value={grade} onChange={loadData}>
            <Option value="">Seleccione uno...</Option>
            <Option value="1101">1101</Option>
            <Option value="1102">1102</Option>
            <Option value="1103">1103</Option>
            <Option value="1104">1104</Option>
            <Option value="1105">1105</Option>
          </Select>
        </StatCard>
        <br />
        {grade !== "" && (
          <>
            <Grid>
              {assessmentExist && (
                <StatCard>
                  <h4>Total evaluaciones</h4>
                  <div className="value">{assessmentExist.length}</div>
                </StatCard>
              )}

              <StatCard>
                <h4>Total estudiantes</h4>
                <div className="value">{stuCount.length}</div>
              </StatCard>
            </Grid>
            <h3
              style={{
                margin: "28px 0 14px",
                fontWeight: "700",
                color: BLACK,
              }}>
              Mis evaluaciones
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
                      <ActionBtn>Eliminar</ActionBtn>
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
                  inProgressAssessments.map((a) => (
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
                    </Row>
                  ))
                )}
              </FieldSet>
            </Row>
            <Row style={{ gridTemplateColumns: "1fr" }}>
              <ActionBtn
                style={{ justifySelf: "center" }}
                onClick={() => {
                  setAddAssessment(!addAssessment);
                  setAssessmentData((prev) => ({
                    ...prev,
                    grade: grade,
                  }));
                }}>
                {addAssessment ? "Cancelar" : "+ Agregar evaluación"}
              </ActionBtn>
            </Row>
            {addAssessment && (
              <Row style={{ gridTemplateColumns: "1fr", padding: "0" }}>
                <FormContainer onSubmit={handleSubmit}>
                  <FieldSet className="border rounded-3 p-3">
                    <Legend className="float-none w-auto px-1">
                      Información de la evaluación
                    </Legend>
                    <Label>Código</Label>
                    <Input
                      type="text"
                      name="code"
                      placeholder="Código"
                      value={assessmentData.code}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Ejemplo: Funciones químicas"
                      value={assessmentData.name}
                      onChange={handleChange}
                      required
                    />
                    <Label>Valoración</Label>
                    <Input
                      type="text"
                      name="assessment"
                      placeholder="Ejemplo: V3"
                      value={assessmentData.assessment}
                      onChange={handleChange}
                      required
                    />
                    <Label>Tema</Label>
                    <Input
                      type="text"
                      name="topic"
                      placeholder="Ejemplo: Ácidos carboxílicos"
                      value={assessmentData.topic}
                      onChange={handleChange}
                      required
                    />
                  </FieldSet>

                  <FieldSet className="border rounded-3 p-3">
                    <Legend className="float-none w-auto px-1">
                      Configuración de la evaluación
                    </Legend>
                    <Label>Instrucciones</Label>
                    <Textarea
                      name="instructions"
                      placeholder="Ejemplo: Seleccionar la respuesta correcta que corresponda al enunciado o imagen mostrada..."
                      value={assessmentData.instructions}
                      onChange={handleChange}
                    />
                    <Label>Cantidad de preguntas</Label>
                    <Input
                      type="number"
                      name="questionsQuantity"
                      value={Number(assessmentData.questionsQuantity)}
                      onChange={handleChange}
                      required
                    />
                    <Label>Tiempo en minutos</Label>
                    <Input
                      type="number"
                      name="durationMinutes"
                      placeholder="Ejemplo: 5"
                      value={Number(assessmentData.durationMinutes)}
                      onChange={handleChange}
                    />
                  </FieldSet>

                  <FieldSet className="border rounded-3 p-3">
                    <Legend className="float-none w-auto px-1">
                      Disponibilidad de la evaluación
                    </Legend>
                    <Label>Fecha de inicio</Label>
                    <Input
                      type="datetime-local"
                      name="startsAt"
                      value={assessmentData.startsAt}
                      onChange={handleChange}
                      required
                    />

                    <Label>Fecha de cierre</Label>
                    <Input
                      type="datetime-local"
                      name="endsAt"
                      value={assessmentData.endsAt}
                      onChange={handleChange}
                      required
                    />
                  </FieldSet>

                  <FieldSet className="border rounded-3 p-3">
                    <Legend className="float-none w-auto px-1">
                      Audiencia de la evaluación
                    </Legend>
                    <Label>Curso:</Label>
                    <Input
                      type="text"
                      name="grade"
                      value={grade}
                      onChange={handleChange}
                      required
                      disabled
                    />
                    <Label>
                      <Input
                        type="checkbox"
                        name="groupAllow"
                        checked={assessmentData.groupAllow}
                        onChange={handleCheckboxGroups}
                      />{" "}
                      Permitir por grupos
                    </Label>

                    {assessmentData.groupAllow && (
                      <Input
                        type="number"
                        name="groups"
                        placeholder="Ejemplo: 4"
                        min={1}
                        value={Number(assessmentData.groups)}
                        onChange={handleChange}
                      />
                    )}
                    <Label>
                      <Input
                        type="checkbox"
                        name="groupAllow"
                        checked={chooseStudents}
                        onChange={handleCheckboxStudents}
                      />{" "}
                      Elegir estudiantes
                    </Label>

                    {chooseStudents && (
                      <>
                        <StudentsContainer>
                          {stuCount.map((stu) => (
                            <Label key={stu.id} style={{ display: "block" }}>
                              <Input
                                type="checkbox"
                                value={stu.id}
                                checked={assessmentData.targetAudience.includes(
                                  stu.id
                                )}
                                onChange={() => handleCheckboxChange(stu.id)}
                                style={{ marginRight: "10px" }}
                              />
                              {stu.name} - {stu.id}
                            </Label>
                          ))}
                        </StudentsContainer>
                        {assessmentData.targetAudience.length > 0 && (
                          <Label>
                            Estudiantes seleccionados:{" "}
                            {assessmentData.targetAudience.join(", ")}
                          </Label>
                        )}
                      </>
                    )}
                  </FieldSet>
                  <Button type="submit">Guardar Evaluación</Button>
                </FormContainer>
              </Row>
            )}
            <h3
              style={{
                margin: "28px 0 14px",
                fontWeight: "700",
                color: BLACK,
              }}>
              Resultados de estudiantes
            </h3>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th>Código</Th>
                    <Th>Nombre</Th>
                    {["V1", "V2", "V3", "V4"].map((tipo) => (
                      <React.Fragment key={tipo}>
                        <Th>Indiv {tipo}</Th>
                        <Th>Grupo {tipo}</Th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stuCount.map((s) => {
                    const notas = notasPorCurso[s.id];
                    return (
                      <tr key={s.id}>
                        <Td>{s.id}</Td>
                        <Td>{s.name}</Td>
                        {["V1", "V2", "V3", "V4"].map((tipo) => (
                          <React.Fragment key={tipo}>
                            <Td>
                              {notas && notas[tipo].individual !== "-"
                                ? Number(notas[tipo].individual).toFixed(1)
                                : "-"}
                            </Td>
                            <Td>
                              {notas && notas[tipo].group !== "-"
                                ? Number(notas[tipo].group).toFixed(1)
                                : "-"}
                            </Td>
                          </React.Fragment>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Content>

      {isModalOpen && (
        <LogOutModal
          IsModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          confirmLogout={confirmLogout}
        />
      )}

      {isCreatedModal && (
        <Modal
          isOpen={isCreatedModal}
          message={`Se ha creado satisfactoriamente la valoración ${assessmentData.name}`}
          closeModal={() => setIsCreatedModal(false)}
        />
      )}
    </Wrapper>
  );
};

export default DashboardProfesor;
