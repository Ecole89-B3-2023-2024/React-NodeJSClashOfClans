import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function ClansTag() {
  const [clan, setClan] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const id = params.tag;

  const url = `http://localhost:3001/clans/${id}`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response);
        setClan(response.data); // Utilisez directement response.data
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
        <h2 className="text-center mb-4">{clan.name}</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-5">
                {clan.name}
            </h3>
            <p className="mb-1">
              Niveau : {clan.clanLevel}, Membres : {clan.members}
            </p>
            <p className="mb-1">Points de clan : {clan.clanPoints}</p>
            <p className="mb-1">Description : {clan.description}</p>
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
        <div className="mt-4">
          <h4>Liste des membres :</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rôle</th>
                <th>HDV</th>
                <th>Trophés</th>
                <th>Profil</th>
              </tr>
            </thead>
            <tbody>
              {clan.memberList.map(member => (
                <tr key={member.tag}>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.townHallLevel}</td>
                  <td>{member.trophies}</td>
                  <td>
                    <Link to={`/players/${encodeURIComponent(member.tag.substring(1))}`}>Voir le profil</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
