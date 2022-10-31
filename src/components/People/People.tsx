import { useState, useEffect, FormEvent } from 'react'

import { PersonType } from '../../types'
import  apiClient from '../../api/http.common'
import Person from '../Person'
import Search from '../Search'
import PaginationButton from '../PaginationButton'

interface SearchProps{
  people: Array<PersonType>;
  query: string;
}

function People() {
  const [people, setPeople] = useState<PersonType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  const dataLimit = 10;

  useEffect(() => {    

    // get the people from the first page and set the state
    apiClient.get(`/People/?page=${currentPage}`)
    .then(response => {
      setPeople(response.data.results);
    })
    .catch(error => console.log(error));
  }, [people, currentPage]);

  // Sets current page to next index
  function goToNextPage(){
    setCurrentPage((page) => page + 1);
  }

  // Sets current page to previous index
  function goToPreviousPage(){
    setCurrentPage((page) => page - 1);
  }

  // Returns anamount of people to be displayed for the current page
  const getPaginatedData = () => {
    let filtered = filterPeople({people, query});
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + 10;
    return filtered.slice(startIndex, endIndex);
  };

  // Handles when the search bar text changes
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    let text = (event.target as HTMLInputElement).value;
    setQuery(text);
  }

  // Filters people based on the search query
  const filterPeople = ({people, query} : SearchProps) => {
    if(!query){
        return people;
    }
    return people.filter((person: PersonType) => {
        const personName = person.name.toLowerCase();
        return personName.includes(query);
    })
  }

  return (
    <>
    <Search handleOnChange={handleOnChange}/>
    <div className='page-section' id='people-section'>
      <div className='pagination'>

        {/*Previous button*/}
        <PaginationButton onClick={goToPreviousPage}
                          currentPage={currentPage}
                          disableLimit={1}
                          className={"prev"}
                          text={"prev"} />
                                  
        {/*Next button*/}
        <PaginationButton onClick={goToNextPage}
                          currentPage={currentPage}
                          disableLimit={people.length}
                          className={"next"}
                          text={"next"} />
        </div>

        {/*People map*/}
        <div className='people-container'>
          {getPaginatedData().map((person, currIndex) => 
            <Person key={currIndex}
                    person={person}
                    id={currIndex + 1} />)}
      </div>
    </div>
    </>
  )
}

export default People
