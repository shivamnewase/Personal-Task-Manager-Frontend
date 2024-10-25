
import { useRoutes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoutes from "./services/privateRoutes";
import Home from "./pages/Home";
import Help from "./pages/Help";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    {
      element: <PrivateRoutes />,
      children: [{ path: "", element: <Home /> }],
    },
    {path:'/help', element: <Help />}
  ]);

  return routes;
}

function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;

