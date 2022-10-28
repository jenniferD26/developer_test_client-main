import { useState, useEffect } from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'
import './People.css'

function People({pageLimit, dataLimit} :
  {
      pageLimit: number;
      dataLimit: number;
  }) {
  const [people, setPeople] = useState<PersonType[]>([])
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  let startIndex = currentPage * dataLimit - dataLimit;

  useEffect(() => {
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => {
        setPeople(peopleResponse.results);
        setPages(Math.round(peopleResponse.results.length / dataLimit));
        console.log(pages);
      })
  }, [pageLimit, dataLimit, pages])

  function goToNextPage(){
    setCurrentPage((page) => page + 1);
    // console.log("current page: " + currentPage);
  }

  function goToPreviousPage(){
    setCurrentPage((page) => page - 1);
    // console.log("current page: " + currentPage);
  }

  const getPaginatedData = () => {
    // const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return people.slice(startIndex, endIndex);
  };

  return (
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
  )
}

export default People
