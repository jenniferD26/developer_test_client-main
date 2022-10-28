import { Link } from 'react-router-dom';
import { PersonType } from '../../types';

interface PersonProps {
  person: PersonType
  id: number
}

function Person({ person, id }: PersonProps) {
  return <Link to={`person/${id}`}>
  <div className='person'>
      {person.name}
    </div>
    </Link>
}

export default Person
