import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useAppSelector } from './app/hooks';

import './styles.css'
import './App.css';

import { selectTrip, selectTripStatus } from './features/trip/tripslice';

import Dashboard from './views/Dashboard/Dashboard';
import TopBar from './views/TopBar/TopBar';
import TripSegment from './views/TripSegments/TripSegments';
import WelcomeOverlay from './views/welcomeOverlay/welcomeOverlay';

function App() {
  const trip = useAppSelector(selectTrip);
  const tripStatus = useAppSelector(selectTripStatus);

  return (
    <Router>
      {WelcomeOverlay()}
      <TopBar />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard trip={trip} />}>
          </Route>
          <Route path="/segment" element={tripStatus === 'welcome' ?
            <Dashboard trip={trip} /> :
            <TripSegment tripSegments={trip.tripSegments} />}>
          </Route>
        </Routes>
      </div>
    </Router >
  );
}


export default App;
