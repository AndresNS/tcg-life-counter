import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PresetsList from "../features/presets/PresetsList";
import { Preset } from "../features/presets/types";

const presets: Preset[] = [
  { id: "1", name: "CC", startingLife: 40, players: 2 },
  { id: "2", name: "Blitz", startingLife: 20, players: 2 },
  { id: "3", name: "Blitz", startingLife: 20, players: 2 },
  { id: "4", name: "Blitz", startingLife: 20, players: 2 },
  { id: "5", name: "Blitz", startingLife: 20, players: 2 },
  { id: "6", name: "Blitz", startingLife: 20, players: 2 },
  { id: "7", name: "Blitz", startingLife: 20, players: 2 },
  { id: "8", name: "Blitz", startingLife: 20, players: 2 },
  { id: "9", name: "Blitz", startingLife: 20, players: 2 },
  { id: "10", name: "Blitz", startingLife: 20, players: 2 },
  { id: "11", name: "Blitz", startingLife: 20, players: 2 },
  { id: "12", name: "Blitz", startingLife: 20, players: 2 },
  { id: "13", name: "Blitz", startingLife: 20, players: 2 },
  { id: "14", name: "Blitz", startingLife: 20, players: 2 },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>TCG Life Counter</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PresetsList presets={presets} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
