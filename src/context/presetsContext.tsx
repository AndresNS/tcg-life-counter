import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Preset } from "../features/presets/types";
import { Database, Storage } from "@ionic/storage";

type PresetsState = {
  presets: Preset[];
  addPreset: () => void;
  getPresets: () => Promise<Preset[]>;
};

const defaultState: PresetsState = {
  presets: [],
  addPreset: () => {},
  getPresets: async () => [],
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

  const addPreset = async () => {
    await storage.set("presets", [
      { id: "14", name: "Blitz", startingLife: 20, players: 2 },
    ]);
  };

  const getPresets = async () => {
    const presets = await storage.get("presets");
    return presets;
  };

  return (
    <PresetsContext.Provider value={{ presets, addPreset, getPresets }}>
      {children}
    </PresetsContext.Provider>
  );
};

export const usePresetsContext = () => useContext(PresetsContext);
