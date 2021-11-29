import React, {useState, useEffect} from 'react';
import { GrUser } from 'react-icons/gr';
import { GiSwordman } from 'react-icons/gi';
import { GiSwordwoman } from 'react-icons/gi';
import { GiNewBorn } from 'react-icons/gi';
import { FaBookDead } from 'react-icons/fa';
import './swornMember.scss';

function SwornMember(props:any) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData]= useState([]);

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
  }, [isLoaded, data, props.data])
  console.log(data);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="swornMember-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.name}<GrUser/></h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.culture}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.gender}
              {data.gender === 'Male' ? <GiSwordman/>:<GiSwordwoman/>}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.born ? <GiNewBorn/>:''}
              {data.born}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.died ? <FaBookDead/>:''}
              {data.died}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.father}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {data.mother}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default SwornMember;
