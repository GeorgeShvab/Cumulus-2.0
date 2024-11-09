import { CurrentWeather } from "@/types";

export interface SidebarProps extends CurrentWeather {
  location: string;
  timeOffset: number;
}
