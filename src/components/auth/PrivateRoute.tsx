import { useContext } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import userContext from "../../context/user";
import { ROUTES } from "../../constants";

interface RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  // @ts-ignore TODO: fix user context types
  const { user } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.uid ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
      }
    />
  );
};

export default ProtectedRoute;
