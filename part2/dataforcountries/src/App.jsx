import { useEffect, useState } from 'react'
import SearchQuery from './components/SearchQuery'
import findCountryService from './services/findCountry'
import CountryDetails from './components/CountryDetails'
import * as Constants from './constants/constants'
import CountryExcess from './components/CountryExcess'
import CountryList from './components/CountryList'

function App() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState(null)
  const [allCountries, setAllCountries] = useState(null)
  const [matchingCountries, setMatchingCountries] = useState([])
  const [countryDisplay, setCountryDisplay] = useState(null)

  const getCountriesAllHook = () => {
    findCountryService.getAllCountries()
      .then(responseData => {
        console.log("All countries: ", responseData)
        setAllCountries(responseData)
      })
  }

  useEffect(getCountriesAllHook, [])

  const getCountriesHook = () => {
    console.log("Matching length: ", matchingCountries.length)
    if(matchingCountries.length > Constants.COUNTRIES_MAX) {
      setCountryDisplay(Constants.DISPLAY_EXCESS)
    }
    else if(matchingCountries.length > Constants.COUNTRIES_MIN && matchingCountries.length <= Constants.COUNTRIES_MAX) {
      setCountryDisplay(Constants.DISPLAY_LIST)
    }
    else if(matchingCountries.length == Constants.COUNTRIES_MIN) {
      findCountryService.getCountry(matchingCountries[0].name)
        .then(responseData => {
          setCountry(responseData)
          setCountryDisplay(Constants.DISPLAY_DETAILS)
        })
        .catch(error => {
          console.log("Error: ", error)
          setCountryDisplay(null)
        })
    }
    else {
      setCountryDisplay(null)
    }
  }

  useEffect(getCountriesHook, [matchingCountries])

  const handleQuery = (event) => {
    setQuery(event.target.value)
    setMatchingCountries(allCountries.filter(country => {
      return country.name.includes(event.target.value)
    }))

    
    if(event.target.value === '') {
      setMatchingCountries([])
      return
    }
  }

  const displayStates = {
    details: <CountryDetails country={country} isDetailsShown={true}/>,
    excess: <CountryExcess />,
    list: <CountryList countryList={matchingCountries} />
  }

  return (
    <div>
      <SearchQuery query={query} handleQuery={handleQuery} />
      {countryDisplay && displayStates[countryDisplay]}
    </div>
  )
}

export default App
