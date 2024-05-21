import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import Menu from "./components/Menu";

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import "./App.css";
import NewGame from "./pages/NewGame";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { PresetsContextProvider } from "./features/presets/presetsContext";
import EditPreset from "./pages/EditPreset";

setupIonicReact();

const App: React.FC = () => {
  return (
    <PresetsContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Home />
              </Route>
              <Route path="/new-game" exact={true}>
                <NewGame />
              </Route>
              <Route path="/edit-preset" exact={true}>
                <EditPreset />
              </Route>
            </IonRouterOutlet>
            <Route path="/game" exact={true}>
              <Game />
            </Route>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </PresetsContextProvider>
  );
};

export default App;
