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
import { GiSwordman } from 'react-icons/gi';
import { GiSwordwoman } from 'react-icons/gi';
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
            <div className="house-attribute">
              <div className="top-title">{house.name} <GiSwordsEmblem/></div>
            </div>
          </div>
        :''}
        <div className="row">
          {ancestralWeaponsFormated ?
              <div className="house-attribute col-4">
                <div className="title">ancestralWeapons <SiElement/> </div>
                {ancestralWeaponsFormated.map((ancestralWeapon) => (
                  <div className="content">{ancestralWeapon}</div>
                ))}
              </div>
          :''}
          {cadetBranchesFormated ?
              <div className="house-attribute col-4">
                <div className="title">cadetBranches <GiSwordBrandish/></div>
                {cadetBranchesFormated.map((cadetBranch) => (
                  <Fragment>
                    <Cadet data={cadetBranch}/>
                  </Fragment>
                ))}
              </div>
          :''}
          {house.coatOfArms ?
            <div className="house-attribute col-4">
              <div className="title">coatOfArms <GiLabCoat/></div>
              <div className="content">{house.coatOfArms}</div>
            </div>
          :''}
        </div>
        {house.founded ?
          <div className="house-attribute">
            <div className="title">founded <MdFoundation/></div>
            <div className="content">{house.founded}</div>
          </div>
        :''}
        {house.founder ?
          <div className="house-attribute">
            <div className="title">founder <FaUser/></div>
            {/* <div className="content">{house.founder}</div> */}
            <Founder data={house.founder}/>
          </div>
        :''}
        {house.overlord ?
          <div className="house-attribute">
            <div className="title">overlord <GiOverlordHelm/> </div>
            {/* <div className="content">{house.overlord}</div> */}
            <Overlord data={house.overlord}/>
          </div>
        :''}
        {house.region ?
          <div className="house-attribute">
            <div className="title">region<GrLocationPin/></div>
            <div className="content">{house.region}</div>
          </div>
        :''}
        {seatsFormated ?
          <div className="house-attribute">
            <div className="title">seats <MdEventSeat/></div>
            {seatsFormated.map((seat) => (
              <div className="content">{seat}</div>
            ))}
          </div>
        :''}
        {swornMembersFormated ?
          <div className="house-attribute">
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
        {titlesFormated ?
          <div className="house-attribute">
            <div className="title">titles <GiSwordBrandish/></div>
            {titlesFormated.map((title) => (
              <div className="content">{title}</div>
            ))}
          </div>
        :''}
        {house.words ?
          <div className="house-attribute">
            <div className="title">words <GiSwordsPower/></div>
            <div className="content">{house.words}</div>
          </div>
        :''}
      </div>
    );
  }
}

export default House;
