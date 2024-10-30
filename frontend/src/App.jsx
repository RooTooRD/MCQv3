import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import ControlePanel from './components/ControlePanel';
import NotFound from './Pages/NotFound'; // Make sure this import is added if you have a NotFound component.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dashboard/*' element={<ProtectedRoute children={<Dashboard />} />} />
        <Route path='cpanel' element={<ProtectedRoute children={<ControlePanel />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
