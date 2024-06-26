import SearchConsoleList from './searchConsoleList';
import SearchGameList from './searchGameList';
import '../style/searchResult.css'
import baseUrl from "../api/api";

function SearchResults({games, consoles}) {

    function renderComponent () {
        if (games.length) {
            return (
                <SearchGameList games={games}/>
            )
        } if (consoles.length) {
            return (
                <SearchConsoleList consoles={consoles}/>
            )
        } else {
            return (
            <h1>Not Found</h1>
            )
        }
    }
    const renderedComponent = renderComponent()
    return (
        <div className="searchResults-page-container">
            <h2 className="search-results-text">Search Results</h2>
            {renderedComponent}
        </div>
    )

}

export default SearchResults;
