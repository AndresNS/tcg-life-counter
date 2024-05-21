import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Preset } from "./types";
import { Database, Storage } from "@ionic/storage";

type PresetsState = {
  presets: Preset[];
  addPreset: (preset: Preset) => Promise<void>;
  getPresets: () => Promise<Preset[]>;
  editPreset: (updatedPreset: Preset) => Promise<void>;
  deletePreset: (presetId: string) => Promise<void>;
};

const defaultState: PresetsState = {
  presets: [],
  addPreset: async () => {},
  getPresets: async () => [],
  editPreset: async () => {},
  deletePreset: async () => {},
};

export const PresetsContext = createContext<PresetsState>(defaultState);

export const PresetsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [storage, setStorage] = useState<Database | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    async function initStorage() {
      const store = new Storage();

      const db = await store.create();
      setStorage(db);

      const presetsList = await db.get("presets");
      setPresets(presetsList);
    }

    initStorage();
  }, []);

  const addPreset = async (preset: Preset) => {
    const updatedPresets = [...presets, preset];
    await storage.set("presets", updatedPresets);

    setPresets(updatedPresets);
  };

  const getPresets = async () => {
    const presets = await storage.get("presets");
    return presets;
  };

  const editPreset = async (updatedPreset: Preset) => {
    const updatedPresets = presets.map((preset) =>
      preset.id === updatedPreset.id ? updatedPreset : preset,
    );
    await storage.set("presets", updatedPresets);

    setPresets(updatedPresets);
  };

  const deletePreset = async (presetId: string) => {
    const updatePresets = presets.filter((preset) => preset.id !== presetId);
    await storage.set("presets", updatePresets);

    setPresets(updatePresets);
  };

  return (
    <PresetsContext.Provider
      value={{ presets, addPreset, getPresets, editPreset, deletePreset }}
    >
      {children}
    </PresetsContext.Provider>
  );
};

export const usePresetsContext = () => useContext(PresetsContext);
