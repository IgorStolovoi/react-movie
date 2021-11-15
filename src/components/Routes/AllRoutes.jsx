import { Route, Routes } from "react-router-dom";
import { allRoutes } from "../../routes";
import PrivateRoute from "./PrivateRoute";
function AllRoutes() {
  return (
    <Routes>
      {allRoutes.map((route, i) => {
        return route.isPrivate ? (
          <Route
            key={i}
            path={route.path}
            element={
              <PrivateRoute redirectTo="/login">{route.component}</PrivateRoute>
            }
          />
        ) : (
          <Route key={i} exact path={route.path} element={route.component} />
        );
      })}
    </Routes>
  );
}

export default AllRoutes;
