import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./constants";
import UserContext from "./context/user";
import useAuthListener from "./customHooks/useAuthListener";
import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from "./pages/Profile";
import ReactLoader from "react-loader";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useAuthListener();

  return (
    // @ts-ignore TODO: fix user context types
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader loaded />}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <PrivateRoute exact path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
