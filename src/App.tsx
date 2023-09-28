import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { Login, SignUp, Home, FormTask, ViewTask } from "./pages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

setupIonicReact();

const App: React.FC = () => {
  const { isLogin, users } = useSelector((state: RootState) => state.users);
  console.log('first', users)
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUp />
          </Route>
          <Route
            path="/home"
            exact={true}
            render={() => {
              return isLogin ? <Home /> : <Login />;
            }}
          />
          <Route
            path="/task/:id"
            render={() => {
              return isLogin ? <ViewTask /> : <Login />;
            }}
          />

          <Route
            path="/addtask"
            render={() => {
              return isLogin ? <FormTask /> : <Login />;
            }}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
