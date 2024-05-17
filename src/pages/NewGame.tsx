import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { create, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Preset } from "../features/presets/types";

const startingLifeValues: number[] = [20, 40, 100];
const totalPlayersValues: number[] = [2, 3, 4];

const NewGame: React.FC = () => {
  const [startingLifeIndex, setStartingLifeIndex] = useState(0);
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [totalPlayersIndex, setTotalPlayersIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [startingLife, setStartingLife] = useState("");
  // const [timer, setTimer] = useState(false);
  // const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  useEffect(() => {
    if (startingLifeIndex !== startingLifeValues.length)
      setStartingLife(startingLifeValues[startingLifeIndex].toString());
  }, [startingLifeIndex]);

  const handleStartGamePress = async () => {
    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name: presetName,
      startingLife: Number(startingLife),
      players: 2,
    };

    if (saveAsPreset) {
      dispatch(createPreset(newPreset));
    }

    router.replace({ pathname: "/game", params: newPreset });
  };

  const showDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const handleCustomStartingLife = () => {
    setStartingLifeIndex(startingLifeValues.length);
    setStartingLife("");

    showDialog();
  };

  const handleCheckboxChange = (event: CustomEvent) => {
    setSaveAsPreset(event.detail.checked);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>New Game</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="p-4">
          <label className="block mb-4">Starting Life</label>
          <div className="flex gap-2">
            {[
              ...startingLifeValues.map((startingLifeValue, index) => (
                <button
                  className={`flex-1 py-4 rounded ${index === startingLifeIndex ? "bg-grays-700" : "bg-grays-800"}`}
                  key={index}
                  onClick={() => setStartingLifeIndex(index)}
                >
                  <span>{startingLifeValue}</span>
                </button>
              )),
              <button
                className={`flex justify-center items-center flex-1 rounded ${
                  startingLifeIndex === startingLifeValues.length
                    ? "bg-grays-700"
                    : "bg-grays-800"
                }`}
                key={startingLifeValues.length}
                onClick={handleCustomStartingLife}
              >
                {startingLifeIndex === startingLifeValues.length &&
                startingLife !== "" ? (
                  <div className="text-2xl">
                    <span>{startingLife}</span>
                    <IonIcon icon={pencil}></IonIcon>
                  </div>
                ) : (
                  <div className="text-2xl">
                    <IonIcon icon={create}></IonIcon>
                  </div>
                )}
              </button>,
            ]}
          </div>
        </div>

        <div className="p-4">
          <label className="block mb-4">Players</label>
          <div className="flex gap-2">
            {totalPlayersValues.map((totalPlayersValue, index) => (
              <button
                className={`flex-1 py-4 rounded ${index === totalPlayersIndex ? "bg-grays-700" : "bg-grays-800"}`}
                key={index}
                disabled={totalPlayersValue !== 2}
                onClick={() => setTotalPlayersIndex(index)}
              >
                <span>{totalPlayersValue}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <IonCheckbox
            className="mb-4"
            labelPlacement="end"
            checked={saveAsPreset}
            onIonChange={handleCheckboxChange}
          >
            Save as preset
          </IonCheckbox>
          {saveAsPreset && <IonInput label="Preset Name" labelPlacement="floating" fill="solid" color="dark"></IonInput>}
        </div>
      </IonContent>
      <IonFooter className="flex justify-center pb-4">
        <a
          href="/new-game"
          className="block text-center w-4/5 bg-primary-500 rounded py-2"
        >
          Start Game
        </a>
      </IonFooter>
    </IonPage>
  );
};

export default NewGame;
