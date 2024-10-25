import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setAuthenticate } from "../redux/API";


const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");
  const to = "/login";

  if (!token) {
    localStorage.clear();
    return <Navigate to={to} />;
  }

  const data = JSON.parse(atob(token.split(".")[1]));
  const isValid = data.exp * 1000 > new Date();

  if (isValid) {
    setAuthenticate(token);
    return (
      <div>
        <Outlet />
       
      </div>
    );
  }
  localStorage.clear();
  return <Navigate to={to} />;
};

export default PrivateRoutes;
