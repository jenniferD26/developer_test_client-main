import React from 'react'

import { fetchJson } from '../../api'
import { PersonType } from '../../types'
import Person from '../Person'
import './People.css'

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])

  React.useEffect(() => {
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => setPeople(peopleResponse.results))
  }, [])

  return (
    <div className='page-section' id='people-section'>
      <div className='people-container'>
        {people.map(person => <Person person={person} />)}
      </div>
    </div>
  )
}

export default People
