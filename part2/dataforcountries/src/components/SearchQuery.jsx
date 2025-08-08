const SearchQuery = ({query, handleQuery}) => {
    return (
        <div>
            find countries <input value={query} onChange={handleQuery}/>
        </div>
    )
}

export default SearchQuery