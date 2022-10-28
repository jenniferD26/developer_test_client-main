import { useState, useEffect } from 'react'
import { PersonType } from '../types';
import { fetchJson } from '../api';
import { useParams } from 'react-router-dom';
import Film from '../components/Film';


export function PersonPage() {
    const { id } = useParams() as { id?: string };
    const [person, setPerson] = useState<PersonType>({
        name : "",
        height: "",
        mass: "",
        hair_color: "",
        skin_color: "",
        birthYear: "",
        gender: "",
        homeworld: "",
        films: new Array<string>("")
    });

    useEffect(() => {
        fetchJson(`people/${id}`)
            .then(response => {
                setPerson(response);
            })
    }, [id])

    function getId(url: string) : string {
        const chunks = url.split('/');
        console.log(chunks[chunks.length - 2]);
        return chunks[chunks.length - 2];
    }


    return (
        <div className='content'>
            <h1>{person.name}</h1>
            <h1>{person.hair_color}</h1>
            {person.films.map((filmId) => 
                <Film key={filmId}
                      id={getId(filmId)}/>
            )}
        </div>
    )
}