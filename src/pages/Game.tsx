import { IonContent, IonPage } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { Preset } from "../features/presets/types";
import Counter from "../features/counter/Counter";

const Game: React.FC = () => {
  const { state } = useLocation<Preset>();
  const { startingLife } = state || {
    startingLife: 0,
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col p-2 h-full">
          <Counter
            player={{ id: "1", startingLife, backgroundColor: "bg-customs-1" }}
          />
          <Counter
            player={{ id: "2", startingLife, backgroundColor: "bg-customs-2" }}
            flip={true}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
