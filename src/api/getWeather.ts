import axios from "axios";
import { Coordinates, DayBoundaries, HourWeather, WeatherData } from "@/types";
import moment from "moment";

const API_KEY = process.env.OPEN_WEATHER_API_KEY;

if (!API_KEY) throw new Error("No OpenWeather api key");

const getDateFromUnix = (time: number) => moment.unix(time).utc().date();

const isRelevantHour = (hourUnix: number, offset: number) => {
  const hour = moment.unix(hourUnix).utc().hour();
  const date = moment.unix(hourUnix).utc().date();

  const clientHour = moment().utc().add(offset, "seconds").hour();
  const clientDate = moment().utc().add(offset, "seconds").date();

  return (
    hour % 3 === 0 || (hour === 23 && clientHour >= 21 && clientDate === date)
  );
};

const getDaysBoundaries = (data: WeatherData["daily"], offset: number) => {
  let dayBoundaries: {
    [key: string]: DayBoundaries;
  } = {};

  data.forEach((item) => {
    const key = getDateFromUnix(item.dt + offset);

    dayBoundaries = {
      ...dayBoundaries,
      [key]: {
        start: item.sunrise,
        end: item.sunset,
      },
    };
  });

  return dayBoundaries;
};

const prepareData = (data: WeatherData): Omit<WeatherData, "hourly"> => {
  const dayBoundaries = getDaysBoundaries(data.daily, data.timezone_offset);

  const hourlyByDate: { [key: number]: HourWeather[] } = {};

  data.hourly.forEach((item) => {
    const unixTime = item.dt + data.timezone_offset;

    const key = getDateFromUnix(unixTime);

    const isDay =
      item.dt > dayBoundaries[key]?.start && item.dt < dayBoundaries[key]?.end;

    const hourData = {
      ...item,
      is_day: isDay,
    };

    if (isRelevantHour(unixTime, data.timezone_offset)) {
      if (hourlyByDate[key]) {
        hourlyByDate[key].push(hourData);
      } else {
        hourlyByDate[key] = [hourData];
      }
    }
  });

  const currentUtcTime = moment().utc().unix();

  data.current.is_day =
    currentUtcTime > data.current.sunrise &&
    currentUtcTime < data.current.sunset;

  data.daily = data.daily
    .map((item) => ({
      ...item,
      hourly: hourlyByDate[getDateFromUnix(item.dt + data.timezone_offset)],
    }))
    .slice(0, 7);

  const { hourly, ...preparedData } = data;

  return preparedData;
};

const getWeather = async ({ latitude, longitude }: Coordinates) => {
  const { data } = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=uk`
  );

  return prepareData(data);
};

export default getWeather;
