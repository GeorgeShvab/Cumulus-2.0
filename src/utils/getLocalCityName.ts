import { GeocodingData } from "@/types";

const getLocalCityName = (data: GeocodingData["local_names"]) => {
  return (
    data.uk ||
    data.en ||
    data.fr ||
    data.de ||
    data.pl ||
    data.lt ||
    data.ru ||
    data.be ||
    data.et ||
    data.ka ||
    data.zh ||
    data.hy ||
    "Kyiv"
  );
};

export default getLocalCityName;
