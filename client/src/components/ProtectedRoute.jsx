import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    API.get("/auth/me")
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;