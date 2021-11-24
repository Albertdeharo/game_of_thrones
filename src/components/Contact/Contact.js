import React, {useState, useEffect} from 'react';
import houses from '../../Mocks/houses.json'
import './contact.scss';

function Contact() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  console.log(houses);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://anapioficeandfire.com/api/houses/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(houses);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  console.log(items);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>this is contact</div>
    );
  }
}

export default Contact;
