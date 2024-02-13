import React, { useState } from "react";

export default function PlayerArrayList(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = props.componentArray.slice(7).filter(location =>
    location.name && location.name.trim() !== "" &&
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="searchInput" className="form-label">Rechercher un pays :</label>
        <input 
          type="text" 
          className="form-control" 
          id="searchInput" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredPlayers.map((location, index) => (
          <div key={index} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-center">{location.name}</h5>
                <div className="d-flex justify-content-center mt-3">
                  <a href={"/locations/" + location.id + "/rankings/clans"} className="btn btn-primary me-2">Classement des clans</a>
                  <a href={"/locations/" + location.id + "/rankings/players"} className="btn btn-success">Classement des joueurs</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
