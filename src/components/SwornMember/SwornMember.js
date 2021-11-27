import React, {useState, useEffect} from 'react';
import { GrUser } from 'react-icons/gr';

import './swornMember.scss';

function SwornMember(props:any) {
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
  console.log(data);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="swornMember-content">
        {/* <div>{data.name}</div> */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.name}<GrUser/></h5>
            <h6 className="card-subtitle mb-2 text-muted">{data.culture}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.gender}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.born}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.died}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.father}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{data.mother}</h6>
            {/* <p className="card-text"></p> */}
            {/* <a href="www.google.com" className="card-link">Card link</a> */}
            {/* <a href="www.google.com" className="card-link">Another link</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SwornMember;
