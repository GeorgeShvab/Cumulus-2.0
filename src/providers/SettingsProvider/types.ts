import { Settings } from "@/types";

export interface SettingsProvider {
  settings: Settings;
  setSettings: (arg: Settings | ((arg: Settings) => Settings)) => void;
}
