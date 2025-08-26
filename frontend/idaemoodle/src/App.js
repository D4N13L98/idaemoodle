import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Assessments from "./pages/assessments/Assessments.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProfesor from "./pages/dashboard/DashboardProfesor.jsx";

function App() {
  const student = sessionStorage.getItem("student");
  const isStudentLoggedIn =
    student && student !== "null" && student !== "undefined";
  const teacher = sessionStorage.getItem("teacher");
  const isTeacherLoggedIn =
    teacher && teacher !== "null" && teacher !== "undefined";
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route
          path="/dashboards"
          element={
            isStudentLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/dashboardt"
          element={
            isTeacherLoggedIn ? (
              <DashboardProfesor />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
