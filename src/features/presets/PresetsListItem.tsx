import {
  IonActionSheet,
  IonButton,
  IonIcon,
  useIonLoading,
} from "@ionic/react";
import { Preset } from "./types";
import { ellipsisVertical, heart, people } from "ionicons/icons";
import type { OverlayEventDetail } from "@ionic/core";
import { usePresetsContext } from "./presetsContext";

export default function PresetsListItem({
  preset: { id, name, startingLife, players },
}: {
  preset: Preset;
}) {
  const { deletePreset } = usePresetsContext();
  const [present, dismiss] = useIonLoading();

  const handleAction = async (result: OverlayEventDetail) => {
    try {
      if (result.data.action === "delete") {
        present({ message: "Deleting Preset" });
        await deletePreset(id);
      }

      if (result.data.action === "edit") console.log("editing");
    } catch (error) {
      // TODO: Add error message
      console.error(error);
    } finally {
      dismiss();
    }
  };

  return (
    <div className="flex p-4 bg-grays-900 rounded-sm">
      <div className="flex flex-col flex-1">
        <h2 className="mb-2 font-bold text-xl">{name}</h2>
        <div className="flex gap-6">
          <div className="flex items-center text-xl gap-2">
            <IonIcon icon={heart} className=""></IonIcon>
            {startingLife}
          </div>
          <div className="flex items-center text-xl gap-2">
            <IonIcon icon={people}></IonIcon>
            {players}
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <IonButton
          size="small"
          fill="clear"
          className="text-neutrals-white"
          id={`open-action-sheet-${id}`}
        >
          <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
        </IonButton>
        <IonActionSheet
          trigger={`open-action-sheet-${id}`}
          header="Actions"
          buttons={[
            {
              text: "Delete",
              role: "destructive",
              data: {
                action: "delete",
              },
            },
            {
              text: "Edit",
              data: {
                action: "edit",
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              data: {
                action: "cancel",
              },
            },
          ]}
          onDidDismiss={({ detail }) => handleAction(detail)}
        ></IonActionSheet>
      </div>
    </div>
  );
}
