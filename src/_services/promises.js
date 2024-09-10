const apiKey = "HYYU9HLMDJNS65YRE96T5TQN4";
const apiKeyWrong = "HYYU9HLMDJN5YRE96T5TQN4";
const city = "Paris";
const cityWrong = "PErt";

export function getWeather(city = "Perth", isMetric = true) {
  let unitGroup = isMetric ? "metric" : "us";
  const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${apiKey}`;

  return fetch(requestURL, {
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Response status: ${response.status} ${response.statusText}`,
        );
      } else {
        return response.json();
      }
    })
    .then(function (response) {
      return {
        location: response.address,
        currentConditions: response.currentConditions,
        forecast: response.days,
      };
    })
    .catch((error) => {
      return error.message;
    });
}
