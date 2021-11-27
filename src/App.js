import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home';
import Houses from './components/Houses/Houses';
import House from './components/House/House';
import Contact from './components/Contact/Contact';
import './app.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/houses">Houses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/houses" element={<Houses />}></Route>
          <Route path="/houses/:id" element={<House />}></Route>
          <Route path="/contact"  element={<Contact />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
