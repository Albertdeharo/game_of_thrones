import React, {useState, useEffect} from 'react';

import './overlord.scss';

function Overlord(props:any) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData]= useState([]);

  // this useEffect will run once
  useEffect(() => {
    fetch(props.data)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [isLoaded])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="overlord-content">
        <div>{data.name}</div>
      </div>
    );
  }
}

export default Overlord;
