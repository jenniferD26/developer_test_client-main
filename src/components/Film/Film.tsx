import {useEffect, useState} from 'react'
import { FilmType } from "../../types";
import { fetchJson } from '../../api';

function Film({id} : {id: string}) {

    const [film, setFilm] = useState<FilmType>({
        title: ""
    })

    useEffect(() => {
        fetchJson(`films/${id}`)
            .then(response => {
                setFilm(response);
            })
    }, [id])

    return(
        <h1>{film.title}</h1>
    )
}

export default Film