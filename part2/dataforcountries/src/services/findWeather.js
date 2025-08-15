import { fetchWeatherApi } from 'openmeteo';

const baseUrl = "https://api.open-meteo.com/v1/forecast";

const getWeatherInCapital = async (country) => {
    if(!country) {
        return
    }

    const params = {
        "latitude": country.capitalInfo.latlng[0],
        "longitude": country.capitalInfo.latlng[1],
        "current": ["temperature_2m", "wind_speed_10m"],
        "timezone": "auto",
        "forecast_days": 1
    }


    const responses = await fetchWeatherApi(baseUrl, params);
    const response = responses[0];  
    const current = response.current()

    const weatherData = {
        temperature: current.variables(0).value(),
        windSpeed: current.variables(1).value()
    }

    return weatherData;
}

export default {
    getWeatherInCapital
}