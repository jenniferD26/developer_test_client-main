import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { PersonType } from '../types';
import apiClient from '../api/http.common';

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

    // 
    useEffect(() => {    
        apiClient.get(`/People/?person=${id}`)
        .then(response => {
            console.log(response);
            setPerson(response.data);
    })
    .catch(error => console.log(error));
    }, [id, person])

    // Gets the id of a film based on a url string
    function getId(url: string) : string {
        const chunks = url.split('/');
        return chunks[chunks.length - 2];
    }

    // Finds the film title from the api
    const getFilmTitle  = async () => {

        const films = await person.films.map(filmUrl => {
            apiClient.get(`/Films/?id=${getId(filmUrl)}`)
            .then(response => response.data.title)
        })

        return Promise.resolve(films);
    }

    return (
        <div className='content'>
            <h1>{person.name}</h1>
            <h1>{person.hair_color}</h1>
            {getFilmTitle().map(film => {
                <h1>{film}</h1>
            })}
        </div>
    )
}