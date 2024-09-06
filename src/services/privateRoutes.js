import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setAuthenticate } from "../redux/API";
import Navbar from "../components/navbar";
const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  const to = "/login";
  if (!user) {
    return <Navigate to={to} />;
  }
  const token = localStorage.getItem("token");
  const data = JSON.parse(atob(token.split(".")[1]));
  const isValid = data.exp * 1000 > new Date();
  if (isValid) {
    setAuthenticate(token);
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }
};

export default PrivateRoutes;
