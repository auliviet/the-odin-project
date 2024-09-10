const apiKey = "HYYU9HLMDJNS65YRE96T5TQN4";
const apiKeyWrong = "HYYU9HLMDJN5YRE96T5TQN4";
const city = "Paris";
const cityWrong = "PErt";

export async function getWeather(city = "Perth", isMetric = true) {
  let unitGroup = isMetric ? "metric" : "us";
  const requestURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${apiKey}`;

  try {
    let response = await fetch(requestURL, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(
        `Response status: ${response.status} ${response.statusText}`,
      );
    } else {
      const weather = await response.json();
      return {
        location: weather.address,
        currentConditions: weather.currentConditions,
        forecast: weather.days,
      };
    }
  } catch (error) {
    return error.message;
  }
}
