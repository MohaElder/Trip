import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useAppSelector, useAppDispatch } from './app/hooks';

import './styles.css'
import './App.css';

import { selectTrip } from './features/trip/tripslice';

import Dashboard from './views/Dashboard/Dashboard';
import TopBar from './views/TopBar/TopBar';
import TripSegment from './views/TripSegments/TripSegments';

function App() {

  const trip = useAppSelector(selectTrip);

  return (
    <Router>
      <TopBar />
      <div>
        <Routes>
          <Route path="/about" element={<TripSegment tripSegments={trip.tripSegments} />}>
        </Route>
        <Route path="/" element={<Dashboard trip={trip} />}>
        </Route>
      </Routes>
    </div>
    </Router >
  );
}


export default App;
