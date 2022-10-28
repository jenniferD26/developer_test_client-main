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

  useEffect(() => {
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => {
        setPeople(peopleResponse.results);
        setPages(Math.round(peopleResponse.results.length / dataLimit));
        console.log(pages);
      })
  }, [])

  function goToNextPage(){
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage(){
    setCurrentPage((page) => page - 1);
  }

  function changePage(event: React.MouseEvent<HTMLButtonElement>) {
    const pageNumber = Number(event.currentTarget.textContent);
    setCurrentPage(pageNumber);
    console.log("Selected page " + pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    const endIndex = startIndex + dataLimit;
    return people.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    // let start = Math.floor((currentPage - 1) / pageLimit) *  pageLimit;
    let start = currentPage - 1;
    let newArray = new Array(pageLimit).map((idx) => start + idx + 1);
    return newArray;
  }

  return (
    <div className='page-section' id='people-section'>
      <div className='pagination'>
        <button
            onClick={goToPreviousPage} 
            className={`prev ${currentPage === 1 ?  'disabled' : ''}`}>
            prev
          </button>
            {getPaginationGroup().map((item, index) => {
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}>
              <span>{item}</span>
            </button>
                    })}
            <button
                onClick={goToNextPage} 
                className={`next ${currentPage === pages ?  'disabled' : ''}`}>
                next
            </button>
        </div>
        <div className='people-container'>
          {getPaginatedData().map((person, idx) => 
            <Person key={idx}
                    person={person}
                    id={idx + 1} />)}
      </div>
      {/* <Pagination
        data={people}
        title="star wars"
        pageLimit={5}
        dataLimit={4}
      /> */}
      {/* <div className='people-container'>
          {people.map((person, idx) => 
            <Person key={idx}
                    person={person} />)}
      </div> */}
    </div>
  )
}

export default People
