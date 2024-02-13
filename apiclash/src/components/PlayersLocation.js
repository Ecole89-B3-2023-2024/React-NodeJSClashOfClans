import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link} from 'react-router-dom';

export default function PlayersLocation() {
  const [players, setplayers] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const id = params.id;

  const url = `http://localhost:3001/locations/${id}/rankings/players`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response);
        setplayers(response.data.items);
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
        setError(err.response.status);
        setLoaded(true);
      });
  }, [url]);

  if (!loaded) {
    return (<h1>En cours de chargement...</h1>);
  } else if (error) {
    return (<h1>Une erreur {error} s'est glissée ici...</h1>);
  } else {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Top Joueurs</h2>
        {players.map((player) => {
          const cleanTag = player.tag.replace(/^#/, '');
          return (
          <Link key={cleanTag} to={`/players/${cleanTag}`} className="card h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-5">
                    Rang {player.rank} / {player.name}
                  </h3>
                  <p className="mb-1">
                    Trophés : {player.trophies}, Niveau : {player.expLevel}
                  </p>
                  <p className="mb-1">Rang précédent : {player.previousRank}</p>
                  <p className="mb-1">{player.league.name}</p>
                </div>
                <div>
                  <img
                    src={player.league.iconUrls.medium}
                    alt={player.name}
                    className="img-fluid"
                  />
                </div>
              </div>
              </Link>
          );
        })}
      </div>
    );
  }
}
