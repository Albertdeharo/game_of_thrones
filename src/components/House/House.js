import React, {useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router';

import Cadet from './../Cadet/Cadet'
import SwornMember from '../SwornMember/SwornMember'
import Founder from '../Founder/Founder'
import Overlord from '../Overlord/Overlord'

import { FaUser } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { MdFoundation } from 'react-icons/md';
import { MdEventSeat } from 'react-icons/md';
import { GrLocationPin } from 'react-icons/gr';
import { GiOverlordHelm } from 'react-icons/gi';
import { GiSwordsEmblem } from 'react-icons/gi';
import { GiSwordsPower } from 'react-icons/gi';
import { GiLabCoat } from 'react-icons/gi';
import { GiSwordBrandish } from 'react-icons/gi';
import { SiElement } from 'react-icons/si';


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
  }, [id, isLoaded, house])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="house-content container">
        {house.name ?
          <div className="col-12">
            <div className="top-title">{house.name} <GiSwordsEmblem/></div>
          </div>
        :''}
        <div className="house-info">
        {ancestralWeaponsFormated ?
              <div className="house-attribute">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">ancestralWeapons <SiElement/></h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                    {ancestralWeaponsFormated.map((ancestralWeapon) => (
                      <div className="content">{ancestralWeapon}</div>
                    ))}
                    </h6>
                  </div>
                </div>
              </div>
          :''}
          {cadetBranchesFormated ?
              <div className="house-attribute">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">cadetBranches <GiSwordBrandish/></h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                    {cadetBranchesFormated.map((cadetBranch) => (
                      <Fragment>
                        <Cadet data={cadetBranch}/>
                      </Fragment>
                    ))}
                    </h6>
                  </div>
                </div>
              </div>
          :''}
          {house.coatOfArms ?
            <div className="house-attribute">
              <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">coatOfArms <GiLabCoat/></h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      <div className="content">{house.coatOfArms}</div>
                    </h6>
                  </div>
                </div>
            </div>
          :''}
        {house.founded ?
          <div className="house-attribute">
             <div className="card">
                <div className="card-body">
                  <h5 className="card-title">founded <MdFoundation/></h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <div className="content">{house.founded}</div>
                  </h6>
                </div>
              </div>
          </div>
        :''}
        
        {house.founder ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">founder <FaUser/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <Founder data={house.founder}/>
                </h6>
              </div>
            </div>
          </div>
        :''}
        {house.overlord ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">overlord <GiOverlordHelm/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <Overlord data={house.overlord}/>
                </h6>
              </div>
            </div>
          </div>
        :''}
        {house.region ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">region<GrLocationPin/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <div className="content">{house.region}</div>
                </h6>
              </div>
            </div>
          </div>
        :''}
        {seatsFormated ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">seats <MdEventSeat/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                {seatsFormated.map((seat) => (
                  <div className="content">{seat}</div>
                ))}
                </h6>
              </div>
            </div>
          </div>
        :''}
        {titlesFormated ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">titles <GiSwordBrandish/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                {titlesFormated.map((title) => (
                  <div className="content">{title}</div>
                ))}
                </h6>
              </div>
            </div>
          </div>
        :''}
        {house.words ?
          <div className="house-attribute">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">words <GiSwordsPower/></h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <div className="content">{house.words}</div>
                </h6>
              </div>
            </div>
          </div>
        :''}
        </div>
        {swornMembersFormated ?
          <div className="house-members">
            <div className="title">
              swornMembers <MdCardMembership/>
            </div>
            <div className="swornMember-container">
              {swornMembersFormated.map((swornMember) => (
                <SwornMember data={swornMember}/>
                ))}
              </div>
          </div>
        :''}
      </div>
    );
  }
}

export default House;
