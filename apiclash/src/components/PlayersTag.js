import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

export default function PlayersTag() {
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const id = params.tag;

  const url = `http://localhost:3001/players/${id}`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        console.log(response);
        setPlayer(response.data); // Utilisez directement response.data
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
    const cleanTag = player.clan.tag.replace(/^#/, '');
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">{player.name}</h2>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-5">
              {player.name} - Rôle : {player.role}
            </h3>
            <p className="mb-1">
              Niveau de l'Hôtel de Ville : {player.townHallLevel}
            </p>
            <p className="mb-1">Trophées : {player.trophies}</p>
            <p className="mb-1">Meilleurs Trophées : {player.bestTrophies}</p>
            <p className="mb-1">Niveau de l'Hôtel de Ville du Constructeur : {player.builderHallLevel}</p>
            <p className="mb-1">Trophées du Constructeur : {player.builderBaseTrophies}</p>
            <p className="mb-1">Meilleurs Trophées du Constructeur : {player.bestBuilderBaseTrophies}</p>
            <p className="mb-1">Guerres d'Étoiles : {player.warStars}</p>
            <p className="mb-1">Victoires en Attaque : {player.attackWins}</p>
            <p className="mb-1">Victoires en Défense : {player.defenseWins}</p>
            <p className="mb-1">Préférence de Guerre : {player.warPreference}</p>
            <p className="mb-1">Donations : {player.donations}</p>
            <p className="mb-1">Reçus en Donations : {player.donationsReceived}</p>
            <p className="mb-1">Contributions à la Capitale du Clan : {player.clanCapitalContributions}</p>
          </div>
          <div>
            <img
              src={player.clan.badgeUrls.medium}
              alt={player.clan.name}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="text-muted small">
          <Link to={`/clans/${cleanTag}`}>Clan: {player.clan.name} (Niveau {player.clan.clanLevel})</Link>
        </div>

        <h4 className="mt-4">Ligue :</h4>
        <p>
          <img
            src={player.league.iconUrls.small}
            alt={player.league.name}
            className="img-fluid"
          />
          {player.league.name}
        </p>

        <h4>État de la Ligue :</h4>
        <p>Trophées Légendaires : {player.legendStatistics.legendTrophies}</p>
        <p>Saison Actuelle : Rang {player.legendStatistics.currentSeason.rank}, Trophées {player.legendStatistics.currentSeason.trophies}</p>
        <p>Meilleure Saison : Rang {player.legendStatistics.bestSeason.rank}, Trophées {player.legendStatistics.bestSeason.trophies}</p>
        <p>Saison Précédente : Rang {player.legendStatistics.previousSeason.rank}, Trophées {player.legendStatistics.previousSeason.trophies}</p>
      </div>
    );
  }
}
