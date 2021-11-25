import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router';

import './house.scss';

function House() {
  let {id} = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [house, setHouse] = useState([]);
  const [cadetBranchesFormated, setCadetBranchesFormated] = useState(house.cadetBranches);
  const [swornMembersFormated, setswornMembersFormated] = useState(house.swornMembers);
  const [seatsFormated, setSeatsFormated] = useState(house.seats);
  const [titlesFormated, setTitlesFormated] = useState(house.titles);
  const [ancestralWeaponsFormated, setAncestralWeaponsFormated] = useState(house.ancestralWeapons);
  // Note: the empty deps array [] means
  // this useEffect will run once
  useEffect(() => {
    fetch(`https://anapioficeandfire.com/api/houses/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          // Delete empty arrays
          if (result.swornMembers.length === 0 ) {delete result.swornMembers;}
          if (result.cadetBranches.length === 0 ) {delete result.cadetBranches;}
          // Delete empty 'string' on array
          if (result.seats[0].length === 0 ) {delete result.seats;}
          if (result.titles[0].length === 0 ) {delete result.titles}
          if (result.ancestralWeapons[0].length === 0 ) {delete result.ancestralWeapons}
          // Set data on diferent arrays
          setHouse(result);
          setCadetBranchesFormated(result.cadetBranches)
          setswornMembersFormated(result.swornMembers)
          setSeatsFormated(result.seats)
          setTitlesFormated(result.titles)
          setAncestralWeaponsFormated(result.ancestralWeapons)
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [id, isLoaded])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="house-content container-fluid">
        {house.name ?
          <div className="house-attribute">
            <div className="title">name</div>
            <div className="content">{house.name}</div>
          </div>
        :''}
        {ancestralWeaponsFormated ?
            <div className="house-attribute">
              <div className="title">ancestralWeapons</div>
              {ancestralWeaponsFormated.map((ancestralWeapon) => (
                <div className="content">{ancestralWeapon}</div>
              ))}
            </div>
        :''}
        {cadetBranchesFormated ?
            <div className="house-attribute">
              <div className="title">cadetBranches</div>
              {cadetBranchesFormated.map((cadetBranch) => (
                <div className="content">{cadetBranch}</div>
              ))}
            </div>
        :''}
        {house.coatOfArms ?
          <div className="house-attribute">
            <div className="title">coatOfArms</div>
            <div className="content">{house.coatOfArms}</div>
          </div>
        :''}
        {house.founded ?
          <div className="house-attribute">
            <div className="title">founded</div>
            <div className="content">{house.founded}</div>
          </div>
        :''}
        {house.founder ?
          <div className="house-attribute">
            <div className="title">founder</div>
            <div className="content">{house.founder}</div>
          </div>
        :''}
        {house.overlord ?
          <div className="house-attribute">
            <div className="title">overlord</div>
            <div className="content">{house.overlord}</div>
          </div>
        :''}
        {house.region ?
          <div className="house-attribute">
            <div className="title">region</div>
            <div className="content">{house.region}</div>
          </div>
        :''}
        {seatsFormated ?
          <div className="house-attribute">
            <div className="title">seats</div>
            {seatsFormated.map((seat) => (
              <div className="content">{seat}</div>
            ))}
          </div>
        :''}
        {swornMembersFormated ?
          <div className="house-attribute">
            <div className="title">swornMembers</div>
            {swornMembersFormated.map((swornMember) => (
              <div className="content">{swornMember}</div>
            ))}
          </div>
        :''}
        {titlesFormated ?
          <div className="house-attribute">
            <div className="title">titles</div>
            {titlesFormated.map((title) => (
              <div className="content">{title}</div>
            ))}
          </div>
        :''}
        {house.words ?
          <div className="house-attribute">
            <div className="title">words</div>
            <div className="content">{house.words}</div>
          </div>
        :''}
      </div>
    );
  }
}

export default House;
