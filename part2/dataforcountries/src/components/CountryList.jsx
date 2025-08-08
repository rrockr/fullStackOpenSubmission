const CountryList = ({countryList}) => {

    console.log("Display List: ", countryList)
    const displayList = countryList.map((countryName) => 
        <p key={countryName}>{countryName}</p>
    )
    

    return (
        <>
            {displayList}
        </>
    )
}

export default CountryList;