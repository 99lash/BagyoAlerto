const weatherSeverityMap = {
  info: {
    conditions: [
      {
        name: "Clear",
        desc: "Clear skies today. A perfect time to double-check your emergency kit."
      },
      {
        name: "Sunny",
        desc: "Bright and sunny. Use this time to review and top up your supplies."
      },
      {
        name: "Partly cloudy",
        desc: "Some clouds in the sky. Stay prepared in case weather changes."
      },
      {
        name: "Overcast",
        desc: "Clouds are gathering. Consider reviewing your checklist items."
      },
      {
        name: "Patchy rain possible",
        desc: "Light rain might happen. Keep your umbrella and kit ready."
      },
      {
        name: "Light drizzle",
        desc: "A little rain is falling. Stay alert and check your essentials."
      },
      {
        name: "Light rain",
        desc: "Mild rain today. Make sure important items are kept dry."
      },
      {
        name: "Light rain shower",
        desc: "Short light showers. Check if your rain gear is in your kit."
      },
      {
        name: "Cloudy",
        desc: "Cloudy skies. Good time to prepare in case of rain later."
      },
    ]
  },
  warning: {
    conditions: [
      {
        name: "Moderate rain",
        desc: "Steady rain today. Ensure your essentials are ready and accessible."
      },
      {
        name: "Moderate or heavy rain shower",
        desc: "Heavy rain bursts expected. Keep your checklist items nearby."
      },
      {
        name: "Patchy light rain with thunder",
        desc: "Light rain and thunder. Make sure your flashlights and power banks are charged."
      },
      {
        name: "Thundery outbreaks possible",
        desc: "Possible thunder and rain. Stay indoors and ready your emergency items."
      },
      {
        name: "Heavy cloud",
        desc: "Dark clouds ahead. Review your supplies and keep them close."
      },
      {
        name: "Rain expected",
        desc: "Rain is coming soon. Double-check your kit before it starts."
      },
    ]
  },
  danger: {
    conditions: [
      {
        name: "Moderate or heavy rain with thunder",
        desc: "Heavy rain bursts expected. Keep your checklist items nearby."
      },
      {
        name: "Heavy rain",
        desc: "Strong rainfall. Keep safe indoors and have your emergency kit ready."
      },
      {
        name: "Torrential rain shower",
        desc: "Very heavy rain bursts. Avoid going out and prepare supplies."
      },
      {
        name: "Thunderstorm",
        desc: "Lightning and strong rain. Stay inside and keep flashlights handy."
      },
      {
        name: "Tropical storm",
        desc: "Strong winds and rain. Secure your home and review your checklist."
      },
      {
        name: "Gale",
        desc: "Strong winds possible. Keep your kit and important documents safe."
      },
      {
        name: "Severe thunderstorm",
        desc: "Dangerous storm conditions. Stay indoors with your essentials ready."
      },
      {
        name: "Prolonged rain",
        desc: "Continuous rain. Be alert for flooding and keep your kit accessible."
      },
      {
        name: "Typhoon warning",
        desc: "Severe storm approaching. Follow safety instructions and prepare your kit now."
      }
    ]
  }
}

export const getWeather = async (lat, lon) => {
  if (!lat || !lon) {
    return {
      isLocationBlocked: true,
      isLocationAllowed: null,
      severity: 'info',
      name: 'Location is blocked',
      desc: 'Please allow location for better app experience.'
    };
  }
  const apiKey = "69b2e9264b704d43830115918252607";
  const forecastEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

  // !Uncomment mo 'to kung gusto mo ma-test yung location is allowed only in the PH.
  // const cityName = 'Shantou'
  // const forecastEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&aqi=no`;
  try {
    let forecastWeatherData = await fetch(forecastEndpoint);
    forecastWeatherData = await forecastWeatherData.json();
    const { current, forecast, location } = forecastWeatherData;
    // block countries outside ng PHuuuu
    // isCountryPH(location);
    if (!isCountryPH(location)) {
      // console.log('test: location is not allowed');
      return {
        isLocationAllowed: false,
        severity: 'info',
        name: `Location is limited only for Philippines`,
        desc: `Your country is not currently allowed and we hope to expand the scope in the future`
      }
    }
    console.log(current);
    console.log(location);
    console.log(forecast.forecastday[0].hour);

    // TODO: update UI with weather info
    // GAB yung reminder alert mo, di pa tapos 'to hahaha initial lang.
    // Siguro improvement nalang sa UI layout, may kulang pa irot 

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
      console.log('here1')
      return weatherConditionWarningOrDangerToday;
    }

    // PRIO 2: display alert reminder kapag may paparating na ulan.
    // PRIO 2: Fixed version
    for (const h of forecast.forecastday[0].hour) {
      const forecastMatchDanger = weatherSeverityMap.danger.conditions.find((c) =>
        c.name.toLowerCase() === h.condition.text.toLowerCase()
      );
      const forecastMatchWarning = weatherSeverityMap.warning.conditions.find((c) =>
        c.name.toLowerCase() === h.condition.text.toLowerCase()
      );
      const forecastCondition = forecastMatchDanger ?
        { severity: 'danger', ...forecastMatchDanger, isLocationAllowed: true } :
        forecastMatchWarning ?
          { severity: 'warning', ...forecastMatchWarning, isLocationAllowed: true } :
          null;

      if (forecastCondition) {
        console.log('here2')
        return forecastCondition; // ✅ This properly exits the main function
      }
    }
    // PRIO 3: display alert reminder na normal day lang ngayon.
    const weatherConditionInfoToday = weatherSeverityMap.info.conditions.find((c) => c.name.toLowerCase() === current.condition.text.toLowerCase());
    if (weatherConditionInfoToday) {
      console.log('here3')
      return { severity: 'info', ...weatherConditionInfoToday, isLocationAllowed: true };
    }
  } catch (error) {
    console.error(error);
    renderAlertReminder({ isLocationAllowed: false })
  }
}

function isCountryPH({ country }) {
  // toggle off the comment kapag dev mode pa.
  // if (country !== 'Philippines') {
  //   throw new Error('Location is limited only to Philippines.'); 
  //   console.log('Location is limited only to Philippines.');
  // }
  return country !== 'Philippines' ? false : true;
}