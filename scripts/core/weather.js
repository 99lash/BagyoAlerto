const weatherSeverityMap = {
  info: {
    conditions: [
      {
        name: "Clear",
        desc: "Skies are clear. A good time to prepare before any weather changes."
      },
      {
        name: "Sunny",
        desc: "Bright and sunny. Stay hydrated and keep monitoring updates."
      },
      {
        name: "Partly cloudy",
        desc: "Some clouds but mostly clear. No immediate weather concerns."
      },
      {
        name: "Overcast",
        desc: "Clouds cover most of the sky. Possible rain later."
      },
      {
        name: "Patchy rain possible",
        desc: "Light rain might occur in some areas. Keep an umbrella handy."
      },
      {
        name: "Light drizzle",
        desc: "Very light rain. Safe to go outside but stay alert."
      },
      {
        name: "Light rain",
        desc: "Mild rainfall. Bring a raincoat or umbrella if going out."
      },
      {
        name: "Light rain shower",
        desc: "Short periods of light rain. Watch for slippery surfaces."
      },
      {
        name: "Cloudy",
        desc: "Mostly cloudy skies. May lead to rain later."
      },
    ]
  },
  warning: {
    conditions: [
      {
        name: "Moderate rain",
        desc: "Steady rainfall. Outdoor activities may be affected."
      },
      {
        name: "Moderate or heavy rain shower",
        desc: "Short bursts of heavy rain. Roads may get slippery."
      },
      {
        name: "Patchy light rain with thunder",
        desc: "Light rain and occasional thunder. Secure outdoor items."
      },
      {
        name: "Thundery outbreaks possible",
        desc: "Possible thunder and rain. Avoid staying outdoors."
      },
      {
        name: "Heavy cloud",
        desc: "Dark skies. Rain may be approaching soon."
      },
      {
        name: "Rain expected",
        desc: "Rain is likely in the coming hours. Prepare umbrellas and gear."
      },

    ]
  },
  danger: {
    conditions: [
      {
        name: "Heavy rain",
        desc: "Strong rainfall. Risk of flooding in low-lying areas."
      },
      {
        name: "Torrential rain shower",
        desc: "Very heavy rain in short bursts. Stay indoors if possible."
      },
      {
        name: "Thunderstorm",
        desc: "Heavy rain with lightning and thunder. Avoid open areas."
      },
      {
        name: "Tropical storm",
        desc: "Strong winds and rain. Secure your home and prepare supplies."
      },
      {
        name: "Gale",
        desc: "Very strong winds. Risk of damage to light structures."
      },
      {
        name: "Severe thunderstorm",
        desc: "Dangerous lightning, heavy rain, and possible flooding."
      },
      {
        name: "Prolonged rain",
        desc: "Continuous heavy rain. Flooding is possible."
      },
      {
        name: "Typhoon warning",
        desc: "Severe storm approaching. Follow official safety instructions."
      }
    ]
  }
}

export const getWeather = async (lat, lon) => {
  const apiKey = "69b2e9264b704d43830115918252607";
  const forecastEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

  try {
    let forecastWeatherData = await fetch(forecastEndpoint);
    forecastWeatherData = await forecastWeatherData.json();
    const { current, forecast, location } = forecastWeatherData;
    // block countries outside ng PH
    validateCountry(location);

    console.log(current);
    console.log(location);
    console.log(forecast.forecastday[0].hour);

    // TODO: update UI with weather info
    // GAB yung reminder alert mo, di pa tapos 'to hahaha initial lang.
    // PRIO 1: display alert reminder kapag naulan ngayon.
    const matchDanger = weatherSeverityMap.danger.conditions.find(
      c => c.name.toLowerCase() === current.condition.text.toLowerCase()
    );
    const matchWarning = weatherSeverityMap.warning.conditions.find(
      c => c.name.toLowerCase() === current.condition.text.toLowerCase()
    );
    const weatherConditionWarningOrDangerToday = matchDanger ? { severity: 'danger', ...matchDanger, isLocationAllowed: true } : matchWarning ? { severity: 'warning', ...matchWarning, isLocationAllowed: true } : null;
    // console.log(weatherConditionWarningOrDangerToday);
    if (weatherConditionWarningOrDangerToday) {
      // console.log('danger || warning today');
      return weatherConditionWarningOrDangerToday;
    }

    // PRIO 2: display alert reminder kapag may paparating na ulan.
    forecast.forecastday[0].hour.forEach((h) => {
      const forecastMatchDanger = weatherSeverityMap.danger.conditions.find((c) => c.name.toLowerCase() === h.condition.text.toLowerCase())
      const forecastMatchWarning = weatherSeverityMap.warning.conditions.find((c) => c.name.toLowerCase() === h.condition.text.toLowerCase());
      const forecastCondition = forecastMatchDanger ? { severity: 'danger', ...forecastMatchDanger, isLocationAllowed: true } : forecastMatchWarning ? { severity: 'warning', ...forecastMatchWarning, isLocationAllowed: true } : null;
      if (forecastCondition) {
        // console.log('danger || warning forecast');
        return forecastCondition;
      }
    });
    // PRIO 3: display alert reminder na normal day lang ngayon.
    const weatherConditionInfoToday = weatherSeverityMap.info.conditions.find((c) => c.name.toLowerCase() === current.condition.text.toLowerCase());
    if (weatherConditionInfoToday)
      return {severity: 'info', ...weatherConditionInfoToday, isLocationAllowed: true};
  } catch (error) {
    console.error(error);
    renderAlertReminder({isLocationAllowed: false})
  }
}

function validateCountry({ country }) {
  if (country !== 'Philippines') throw new Error('Location is limited only to Philippines.');
}
