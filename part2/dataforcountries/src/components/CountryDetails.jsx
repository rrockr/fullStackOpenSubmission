const CountryDetails = ({country}) => {

    console.log("Rendering Country Details Country: ", country)
    const countryArr = Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>
            {value}
        </li>
    ))

    return (
        <div>
            <h1>{country.name.common}</h1>
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
        </div>
    )
}

export default CountryDetails;