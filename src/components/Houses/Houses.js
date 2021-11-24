import React, {useState, useEffect} from 'react';
import housesData from '../../Mocks/houses.json'
import { Link } from 'react-router-dom';
import './houses.scss';

function Houses() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [houses, setHouses] = useState([]);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://anapioficeandfire.com/api/houses/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setHouses(housesData);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      houseID();
  }, [])
  console.log(houses);
  const houseID = () =>{
    houses.map(item => (
      console.log(item.url.split('/').pop())
    ));
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {houses.map(item => (
          <li key={item.url}>
            {/* {item.name} <br /> {item.url} */}
            <Link to={`/houses/${item.url.split('/').pop()}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default Houses;
