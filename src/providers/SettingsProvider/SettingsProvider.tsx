import { SettingsProvider } from "@/providers/SettingsProvider/types";
import { cookies } from "next/dist/client/components/headers";
import { Settings } from "@/types";
import { createContext, useEffect, useState } from "react";
import moment from "moment";

const getInitialState = (): Settings => {
  const getCookieValue = (name: string, defaultValue: string): string => {
    if (typeof document !== "undefined") {
      return (
        document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
        defaultValue
      );
    } else {
      const cookie = cookies();
      return cookie.get(name)?.value || defaultValue;
    }
  };

  const temperatureUnit = getCookieValue("temperature_unit", "celsius");
  const speedUnit = getCookieValue("speed_unit", "ms");
  const pressureUnit = getCookieValue("pressure_unit", "hPa");
  const defaultLocation = getCookieValue(
    "default_location",
    null as unknown as string
  );

  const validTemperatureUnits = ["celsius", "fahrenheit"];
  const validSpeedUnits = ["kmh", "mph", "ms"];
  const validPressureUnits = ["hPa", "mmHg"];

  return {
    temperatureUnit: validTemperatureUnits.includes(temperatureUnit!)
      ? temperatureUnit
      : "celsius",
    speedUnit: validSpeedUnits.includes(speedUnit!) ? speedUnit : "ms",
    pressureUnit: validPressureUnits.includes(pressureUnit!)
      ? pressureUnit
      : "hPa",
    defaultLocation: decodeURI(defaultLocation || ""),
  } as Settings;
};

export const settingsContext = createContext<SettingsProvider>({
  settings: {} as Settings,
  setSettings: () => {},
});

export const useSettingsContex = () => {
  const initialState: Settings = getInitialState();

  const [settings, setSettings] = useState<Settings>(initialState);

  const expiresIn = moment().utc().add(1, "y").toDate().toUTCString();

  const location = encodeURI(settings.defaultLocation || "");

  useEffect(() => {
    document.cookie = `temperature_unit=${settings.temperatureUnit}; path=/; expires=${expiresIn}`;
    document.cookie = `speed_unit=${settings.speedUnit}; path=/; expires=${expiresIn}`;
    document.cookie = `pressure_unit=${settings.pressureUnit}; path=/; expires=${expiresIn}`;
    document.cookie = `default_location=${location}; path=/; expires=${expiresIn}`;
  }, [settings]);

  return { settings, setSettings };
};
