import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Assessments from "./pages/assessments/Assessments.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardProfesor from "./pages/dashboard/DashboardProfesor.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/dashboards" element={<Dashboard />} />
      <Route path="/dashboardt" element={<DashboardProfesor />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
