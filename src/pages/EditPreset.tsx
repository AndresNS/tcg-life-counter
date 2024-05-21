import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { create, pencil } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { Preset } from "../features/presets/types";
import { OverlayEventDetail } from "@ionic/core/components";
import { usePresetsContext } from "../features/presets/presetsContext";
import { useHistory, useLocation } from "react-router-dom";

const startingLifeValues: number[] = [20, 40, 100];
const totalPlayersValues: number[] = [2, 3, 4];
const defaultPreset: Preset = { id: "", name: "", startingLife: 0, players: 0 };
function getStartingLifeIndex(
  startingLife: number,
  startingLifeValues: number[],
) {
  const index = startingLifeValues.findIndex((value) => {
    return value === startingLife;
  });

  return index === -1 ? startingLifeValues.length : index;
}

interface LocationState {
  preset: Preset;
}

const EditPreset: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { preset } = state || {
    preset: defaultPreset,
  };

  const { editPreset } = usePresetsContext();

  const [startingLifeIndex, setStartingLifeIndex] = useState(
    getStartingLifeIndex(preset.startingLife, startingLifeValues),
  );
  const [presetName, setPresetName] = useState(preset.name);
  const [totalPlayersIndex, setTotalPlayersIndex] = useState(0);
  const [startingLife, setStartingLife] = useState("");
  const [customStartingLife, setCustomStartingLife] = useState("");

  const customStartingLifeModal = useRef<HTMLIonModalElement>(null);
  const customStartingLifeInput = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    if (startingLifeIndex !== startingLifeValues.length) {
      setStartingLife(startingLifeValues[startingLifeIndex].toString());
    }
  }, [startingLifeIndex]);

  const handleStartGame = async () => {
    editPreset({
      id: preset.id,
      name: presetName,
      startingLife: Number(startingLife),
      players: 2,
    });

    history.push({
      pathname: "/",
      state: { startingLife },
    });
  };

  const handleCustomStartingLife = () => {
    setStartingLifeIndex(startingLifeValues.length);
  };

  const confirmDialog = () => {
    customStartingLifeModal.current?.dismiss(
      customStartingLifeInput.current?.value,
      "confirm",
    );
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (!ev.detail.role) setStartingLifeIndex(0);
    if (ev.detail.role === "confirm") setStartingLife(customStartingLife);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Edit Preset</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="p-4">
          <IonInput
            label="Preset Name"
            labelPlacement="floating"
            fill="solid"
            color="dark"
            value={presetName}
            onIonInput={(event: CustomEvent) =>
              setPresetName(event.detail.value)
            }
          ></IonInput>
        </div>
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
                  <span className="text-lg">{startingLifeValue}</span>
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
                id="open-modal"
              >
                {customStartingLife !== "" ? (
                  <div className="flex justify-center items-center gap-2 text-xl">
                    <span className="text-lg">{customStartingLife}</span>
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
                <span className="text-lg">{totalPlayersValue}</span>
              </button>
            ))}
          </div>
        </div>
        <IonModal
          ref={customStartingLifeModal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Custom Starting Life</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() =>
                    customStartingLife !== ""
                      ? confirmDialog()
                      : customStartingLifeModal.current?.dismiss()
                  }
                >
                  {customStartingLife !== "" ? "Confirm" : "Cancel"}
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Starting life"
              value={customStartingLife}
              onIonInput={(event: CustomEvent) =>
                setCustomStartingLife(event.detail.value)
              }
              labelPlacement="floating"
              fill="solid"
              color="dark"
              type="number"
              ref={customStartingLifeInput}
            ></IonInput>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default EditPreset;
