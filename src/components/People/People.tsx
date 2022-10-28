import { useState, useEffect, FormEvent } from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'
import Search from '../Search'
import './People.css'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps{
  people: Array<PersonType>;
  query: string;
}

function People({pageLimit, dataLimit} :
  {
      pageLimit: number;
      dataLimit: number;
  }) {
  const [people, setPeople] = useState<PersonType[]>([])
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  let startIndex = currentPage * dataLimit - dataLimit;

  useEffect(() => {
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => {
        setPeople(peopleResponse.results);
        setPages(Math.round(peopleResponse.results.length / dataLimit));
      })
  }, [pageLimit, dataLimit, pages])

  function goToNextPage(){
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage(){
    setCurrentPage((page) => page - 1);
  }

  const getPaginatedData = () => {
    // const startIndex = currentPage * dataLimit - dataLimit;
    let filtered = filterPeople({people, query});
    const endIndex = startIndex + dataLimit;
    return filtered.slice(startIndex, endIndex);
  };

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    let text = (event.target as HTMLInputElement).value;
    console.log(text);
    setQuery(text);
  }

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
        <button
            onClick={goToPreviousPage} 
            className={`prev ${currentPage === 1 ?  'disabled' : ''}`}>
            prev
          </button>

            <button
                onClick={goToNextPage} 
                className={`next ${currentPage === pages ?  'disabled' : ''}`}>
                next
            </button>
        </div>
        <div className='people-container'>
          {getPaginatedData().map((person, currIndex) => 
            <Person key={currIndex}
                    person={person}
                    id={startIndex + currIndex + 1} />)}
      </div>
    </div>
    </>
  )
}

export default People
