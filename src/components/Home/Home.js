import React from 'react';

import {
  Link
} from "react-router-dom";

import './home.scss';

function Home() {
  return (
    <div className="home">
      <div className="title shimmer">GAME OF THRONES</div>
      <div className="randomhouse logo-1"></div>
      <div className="randomhouse logo-2"></div>
      <div className="randomhouse logo-3"></div>
      <div className="randomhouse logo-4"></div>
      <div className="randomhouse logo-5"></div>
      <div className="randomhouse logo-6"></div>
      <div className="wrap">
        <Link 
          to="/houses"
          >
          <button className="button">Check Houses</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
