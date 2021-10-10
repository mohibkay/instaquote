import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import userContext from "../../context/user";
import { ROUTES } from "../../constants";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.uid ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
}
