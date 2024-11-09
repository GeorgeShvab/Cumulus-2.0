import { cookies, headers } from "next/dist/client/components/headers";
import getCoordinates from "@/utils/getCoordinates";
import geocode from "@/api/geocode";
import getLocalCityName from "@/utils/getLocalCityName";
export { default as metadata } from "@/app/metadata";

const getCoordinatesFromIp = async () => {
  const ip = headers().get("x-forwarded-for") as string;
  const ipToUse = process.env.MODE === "PRODUCTION" ? ip : "178.251.107.104";

  const data = await getCoordinates(ipToUse);
  const { local_names } = await geocode(data.city);

  return {
    location: { lat: data.lat, lon: data.lon },
    city: getLocalCityName(local_names),
  };
};

const getCity = async () => {
  const location = cookies().get("default_location")?.value;
  const defaultLocation =
    location && location !== "null" ? decodeURI(location) : undefined;

  if (defaultLocation) {
    const data = await geocode(defaultLocation);
    if (data) {
      return {
        location: { lat: data.lat, lon: data.lon },
        city: defaultLocation,
      };
    }
  }

  return await getCoordinatesFromIp();
};

export default getCity;
