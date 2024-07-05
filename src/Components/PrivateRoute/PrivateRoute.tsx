import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  isAuthenticated: Function;
}

export const PrivateRoute: React.FC<Props> = ({ isAuthenticated }) => {
  const [internalIsAuthenticated, setInternalIsAuthenticated] = useState(
    isAuthenticated()
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setInternalIsAuthenticated(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!internalIsAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
