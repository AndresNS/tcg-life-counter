import { Preset } from "./types";
import PresetsListItem from "./PresetsListItem";

export default function PresetsList({ presets }: { presets: Preset[] }) {
  return (
    <div className="flex flex-col gap-2 m-4">
      {presets.map((preset,index) => (
        <PresetsListItem preset={preset} key={index} />
      ))}
    </div>
  );
}
