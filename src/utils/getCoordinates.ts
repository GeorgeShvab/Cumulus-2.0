import axios from "axios";
import { CoordinatesResponse } from "@/types";

const getCoordinates = async (ip: string): Promise<CoordinatesResponse> => {
  const { data } = await axios.get<CoordinatesResponse>(
    `http://ip-api.com/json/${ip}`
  );

  return data;
};

export default getCoordinates;
