import {
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PresetsList from "../features/presets/PresetsList";
import { usePresetsContext } from "../features/presets/presetsContext";

const Home: React.FC = () => {
  const { presets } = usePresetsContext();

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
      <IonFooter className="flex justify-center pb-4">
        <a
          href="/new-game"
          className="block text-center w-4/5 bg-primary-500 rounded py-2"
        >
          New Game
        </a>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
