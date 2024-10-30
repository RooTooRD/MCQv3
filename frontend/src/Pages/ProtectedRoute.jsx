import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const location = useLocation();

  if (!token) {
    // Redirect to login and pass along the current location
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
