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
import { usePresetsContext } from "../context/presetsContext";

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
    </IonPage>
  );
};

export default Home;
