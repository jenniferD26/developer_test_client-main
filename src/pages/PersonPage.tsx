import { useState, useEffect } from 'react'
import { PersonType } from '../types';
import { fetchJson } from '../api';
import { useParams } from 'react-router-dom';


export function PersonPage() {
    const { id } = useParams() as { id?: string };
    const [person, setPerson] = useState<PersonType>({
        name : ""
    });

    useEffect(() => {
        fetchJson(`people/${id}`)
            .then(response => {
                console.log(response);
                setPerson(response);
            })
    }, [id])


    return (
        <div>
            <h1>{person.name}</h1>
        </div>
    )
}