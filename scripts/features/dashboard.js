import { getUserLocation } from "../core/geolocation.js";
import { getWeather } from "../core/weather.js";
import { renderAlertReminder } from "./alert.js";

export const dashboard = async () => {
  try {
    const {isAllowed, data} = await getUserLocation();
    // hayaan muna yung isAllowed data baka magamit in the future.
    // console.log(isAllowed);
    // if (isAllowed) {
      const { lat, lon } = data;
      const response = await getWeather(lat, lon);
      // console.log(await response);
      renderAlertReminder(response);
      // renderAlertReminder({ isLocationAllowed: false });
  } catch (error) {
    console.error(error);
  }

};