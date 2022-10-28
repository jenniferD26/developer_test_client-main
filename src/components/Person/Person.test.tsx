import { render, screen } from '@testing-library/react';

import { PersonType } from '../../types';
import Person from './Person'

describe('<Person />', () => {
  test('should render the person\'s name', () => {
    const person: PersonType = 
    { 
      name: 'Jek Tono Porkins',
      height: '160',
      mass: '73',
      hair_color: 'none',
      skin_color: 'green',
      birthYear: 'unknown',
      gender: 'male',
      homeworld: 'Tatooine',
      films: new Array<string>('Return of the Jedi')
    }

    render(<Person person={person} id={0} />)

    screen.getByText(person.name)
  })
});
