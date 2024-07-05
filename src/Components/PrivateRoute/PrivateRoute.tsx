import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
}

export const PrivateRoute: React.FC<Props> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
