import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard"

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
