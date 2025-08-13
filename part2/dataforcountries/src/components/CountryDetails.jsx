import { Fragment, useState } from "react";

const CountryDetails = ({country, isDetailsShown = false}) => {

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