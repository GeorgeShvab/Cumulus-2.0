import { usePathname, useSearchParams } from "next/navigation";

const useCurrentLocation = () => {
  const pathname = usePathname();
  const search = useSearchParams();

  let input;

  if (search.has("latitude") && search.has("longitude")) {
    input = `${search.get("latitude")} ${search.get("longitude")}`;
  } else {
    input = decodeURI(pathname.split("/").reverse()[0]);
  }

  return input;
};

export default useCurrentLocation;
