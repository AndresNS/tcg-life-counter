import { IonActionSheet, IonButton, IonIcon } from "@ionic/react";
import { Preset } from "./types";
import { ellipsisVertical, heart, people } from "ionicons/icons";
import type { OverlayEventDetail } from "@ionic/core";

export default function PresetsListItem({
  preset: { id, name, startingLife, players },
}: {
  preset: Preset;
}) {
  const logResult = (result: OverlayEventDetail) => {
    console.log(JSON.stringify(result, null, 2));
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
          onDidDismiss={({ detail }) => logResult(detail)}
        ></IonActionSheet>
      </div>
    </div>
  );
}
