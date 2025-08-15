import { Fragment } from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({countryList}) => {
    
    const displayList = countryList.map((country) => 
        <Fragment key={country.name}>
            <CountryDetails country={country} isDetailsShown={false}/>
        </Fragment>
    )
    
    return (
        <>
            {displayList}
        </>
    )
}

export default CountryList;