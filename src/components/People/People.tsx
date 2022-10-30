import { useState, useEffect, FormEvent } from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'
import Search from '../Search'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButton from '../PaginationButton'
import  apiClient from '../../api/http.common'

interface SearchProps{
  people: Array<PersonType>;
  query: string;
}

function People() {
  const [people, setPeople] = useState<PersonType[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState("")
  // let startIndex = currentPage * 10 - 10;

  useEffect(() => {
    getPeople(currentPage);
    console.log("useEffect");
  });

  function goToNextPage(){
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage(){
    setCurrentPage((page) => page - 1);
  }

  const getPeople = (id: number) => {
    apiClient.get(`api/?=${id}`)
    .then(response => {
      setPeople(response.data.results);
    })
    .catch(error => console.log(error));
  }

  const getPaginatedData = () => {
    // const startIndex = currentPage * dataLimit - dataLimit;

    // let filtered = filterPeople({people, query});
    // const endIndex = startIndex + 10;
    // return filtered.slice(startIndex, endIndex);
    // return people;
  };

  function getMaxPages() {
    let filtered = filterPeople({people, query});
    return Math.ceil(filtered.length / 10);
  }

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    let text = (event.target as HTMLInputElement).value;
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
        <PaginationButton onClick={goToPreviousPage}
                          currentPage={currentPage}
                          disableLimit={1}
                          className={"prev"}
                          text={"prev"} />
        <PaginationButton onClick={goToNextPage}
                          currentPage={currentPage}
                          disableLimit={82}
                          className={"next"}
                          text={"next"} />
        </div>
        <div className='people-container'>
          {people.map((person, currIndex) => 
            <Person key={currIndex}
                    person={person}
                    id={currIndex + 1} />)}
      </div>
    </div>
    </>
  )
}

export default People
