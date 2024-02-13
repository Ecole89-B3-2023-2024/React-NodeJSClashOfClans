import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function ClansLocation() {
  const [clans, setClans] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const id = params.id;

  const url = `http://localhost:3001/locations/${id}/rankings/clans`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response);
        setClans(response.data.items);
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
        <h2 className="text-center mb-4">Top Clans</h2>
        {clans.map((clan) => {
          const cleanTag = clan.tag.replace(/^#/, '');
          return (
            <Link key={cleanTag} to={`/clans/${cleanTag}`} className="card h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-5">
                    Rang {clan.rank} / {clan.name}
                  </h3>
                  <p className="mb-1">
                    Niveau : {clan.clanLevel}, Membres : {clan.members}
                  </p>
                  <p className="mb-1">Points de clan : {clan.clanPoints}</p>
                  <p className="mb-1">Rang précédent : {clan.previousRank}</p>
                </div>
                <div>
                  <img
                    src={clan.badgeUrls.medium}
                    alt={clan.name}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="text-muted small">
                Location: {clan.location.name} ({clan.location.countryCode})
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
