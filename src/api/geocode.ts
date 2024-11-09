import { GeocodingData } from "@/types";
import axios from "axios";

export const geocode = async (location: string) => {
  const { data } = await axios.get<GeocodingData[]>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=0736c60532d42e3d2444c0d51bb57783`
  );

  return data[0] || null;
};

export default geocode;
