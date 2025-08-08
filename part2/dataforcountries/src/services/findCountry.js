import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAllCountries = () => {
    const request = axios.get(baseUrl.concat(`all`))
    return request.then(response => {

        return response.data.map(countryObject => {
            return countryObject.name.common
        })
    })
}

const getCountries = query => {
    console.log("Query: ", query)
    const request = axios.get(baseUrl.concat(`name/${query}`))
    return request.then(response => response.data)
}

export default {
    getAllCountries,
    getCountries
}