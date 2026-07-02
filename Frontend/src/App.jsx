import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DesignationsPage from "./pages/DesignationsPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/designations" element={<DesignationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
