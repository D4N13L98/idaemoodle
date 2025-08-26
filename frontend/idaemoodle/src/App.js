import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Assessments from "./pages/assessments/Assessments.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProfesor from "./pages/dashboard/DashboardProfesor.jsx";

function App() {
  const student = JSON.parse(localStorage.getItem("student"));
  const isStudentLoggedIn = student !== null;

  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const isTeacherLoggedIn = teacher !== null;

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
