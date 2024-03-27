import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  authentication: boolean;
  children: React.ReactNode;
}
const ProtectedRoute = ({
  authentication = false,
  children,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authStatus } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate(`/login?message=you need to login first&redirectTo=${pathname}`);
    }
  }, [authStatus, authentication, navigate, pathname]);
  return children;
};

export default ProtectedRoute;
