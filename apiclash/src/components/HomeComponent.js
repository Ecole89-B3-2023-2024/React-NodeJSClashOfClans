import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerArrayList from './PlayerArrayList';

export default function HomeComponent() {
    const [playerArray, setPlayerArray] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const url = 'http://localhost:3001/locations';
    useEffect(() => {axios.get(url)
        .then((response) => {
            console.log(response)
            setPlayerArray(response.data.items);
            setLoaded(true);
            })
        .catch((err)=>{
            console.log(err);
            setError(err);
            setLoaded(true)
            })
        },[url]);

    if(!loaded) {
        return(<div>En cours de chargement...</div>);
    } else if (error) {
        return(<div>Une erreur {error.code} s'est glissée ici...</div>)
    } else {
        return(
            <PlayerArrayList componentArray={playerArray} subtitle=""/>
        )
    }
}