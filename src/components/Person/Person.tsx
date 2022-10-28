import { PersonType } from '../../types';
import './Person.css';

interface PersonProps {
  person: PersonType
}

function Person({ person }: PersonProps) {
  return <div className='person'>
      {person.name}
    </div>
}

export default Person
