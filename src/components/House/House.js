import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router';

import './house.scss';

function House() {
  let {id} = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [house, setHouse] = useState([]);
  // console.log(house.swornMembers.length);
  // const isArray = () => {
  //   if ( house.swornMembers.length) {
  //     console.log('si es array i hi han npc');
  //   } else {
  //     console.log('esta buit')
  //   }
  // }
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://anapioficeandfire.com/api/houses/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setHouse(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      // isArray();
  }, [id])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="title">Name</div>
        {house.name}
        <br />
        <div className="title">Ancestral Weapons</div>
        {house.ancestralWeapons}
        <br />
        <div className="title">cadetBranches</div>
        {house.cadetBranches}
        {/* {house.cadetBranches.lenght > 0 ?
          <Fragment>
            <div className="title">cadetBranches</div>
            <div className="content">{house.cadetBranches}</div>
          </Fragment>
        :''} */}
        <br />
        <div className="title">coatOfArms</div>
        {house.coatOfArms}
        <br />
        <div className="title">founded</div>
        {house.founded}
        <br />
        <div className="title">founder</div>
        {house.founder}
        <br />
        {house.overlord ?
          <Fragment>
            <div className="title">overlord</div>
            <div className="content">{house.overlord}</div>
          </Fragment>
        :''}
        {/* <div className="title">overlord</div>
        {house.overlord} */}
        <br />
        <div className="title">region</div>
        {house.region}
        <br />
        <div className="title">seats</div>
        {house.seats}
        <br />
        {house.swornMembers ?
          <Fragment>
            <div className="title">swornMembers</div>
            <div className="content">{house.swornMembers}</div>
          </Fragment>
        :''}
        {/* {house.swornMembers.isArray(array) && array.length} */}
        <br />
        {house.titles ?
          <Fragment>
            <div className="title">titles</div>
            <div className="content">{house.titles}</div>
          </Fragment>
        :''}
        <br />
       
        {house.words ?
          <Fragment>
            <div className="title">words</div>
            <div className="content">{house.words}</div>
          </Fragment>
        :''}
      </div>
    );
  }
}

export default House;
