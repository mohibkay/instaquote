import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loader from "./components/utils/Loader";
import { ROUTES } from "./constants";
import UserContext from "./context/user";
import useAuthListener from "./customHooks/useAuthListener";
import PrivateRoute from "./components/auth/PrivateRoute";
import Profile from "./pages/profile";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Loader />}>
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
