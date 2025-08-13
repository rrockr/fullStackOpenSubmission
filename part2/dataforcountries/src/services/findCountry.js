import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const countryData = (countryObject) => {
    return {
        name: countryObject.name.common,
        capital: countryObject.capital,
        area: countryObject.area,
        languages: countryObject.languages,
        flags: {
            png: countryObject.flags.png,
            alt: countryObject.flags.alt
        }
    }
}

const getAllCountries = () => {
    const request = axios.get(baseUrl.concat(`all`))
    return request.then(response => {
        return response.data.map(countryObject => countryData(countryObject))
    })
}

const getCountry = query => {
    const request = axios.get(baseUrl.concat(`name/${query}`))
    return request.then(response => countryData(response.data))
}

export default {
    getAllCountries,
    getCountry
}