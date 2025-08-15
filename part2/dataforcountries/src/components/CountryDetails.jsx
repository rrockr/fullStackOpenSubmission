import { Fragment, useState } from "react";
import * as Constants from '../constants/constants'

const CountryDetails = ({country, weather, isDetailsShown = false, isWeatherShown = false}) => {
    const [showDetails, setShowDetails] = useState(isDetailsShown);
    const countryArr = Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>
            {value}
        </li>
    ))

    return (
        <>
            {showDetails ? 
                <>
                    <h1>{country.name}</h1>
                    <p>Capital {country.capital}</p>
                    <p>Area {country.area}</p>
                    <h2>Languages</h2>
                    <ul>
                        {countryArr}
                    </ul>
                    <img
                        src={country.flags.png}
                        alt={country.flags.alt} 
                    />
                    {isWeatherShown && weather &&
                        <>
                            <h2>Weather in {country.capital}</h2>
                            <p>Temperature {weather.temperature.toFixed(Constants.DISPLAY_DECIMAL_PLACES)}</p>
                            <p>Wind {weather.windSpeed.toFixed(Constants.DISPLAY_DECIMAL_PLACES)}</p>
                        </>
                    }
                </>
                :
                <>
                    <p>
                        {country.name} {" "}
                        <button onClick={() => { setShowDetails(!showDetails)}}>Show</button>
                    </p>
                    
                </>
            } 
        </>
    )
}

export default CountryDetails;