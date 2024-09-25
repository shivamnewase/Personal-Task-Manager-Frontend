import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoutes from "./services/privateRoutes";
import Home from "./pages/home";

function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: "/Home",
          element: <Home />,
        },
      ],
    },
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
