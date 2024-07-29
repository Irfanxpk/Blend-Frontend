import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {RootState } from "../../redux/store";


export const ProtectedAdminRoute = () => {
  const admin = useSelector((state: RootState) => state.admin.adminData);

    console.log("admin",admin)
  return admin ? <Outlet /> : <Navigate to="/admin" />;
};
