import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { LogIn } from "./components/LogIn/LogIn";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";

function App() {
  // return <Dashboard />;
  // return <LogIn />;

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Dashboard} exact /> */}
        <Route path="/login" component={LogIn} exact />

        <PrivateRoutes path="/" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
