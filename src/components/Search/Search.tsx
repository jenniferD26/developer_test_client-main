import { PersonType } from "../../types";

function Search({handleOnChange} : {handleOnChange: any}) {
    return (      
    <div className="page-section" id="search-section">
    <form>
        <input type="text" 
              onChange={event => handleOnChange(event)} />
      </form>
    </div>
    )
}

export default Search