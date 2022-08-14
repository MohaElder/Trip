import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from './app/hooks';

import './styles.css'
import './App.css';

import { selectTrip } from './features/trip/tripslice';

import Dashboard from './views/Dashboard/Dashboard';
import TopBar from './views/TopBar/TopBar';



function App() {

  const trip = useAppSelector(selectTrip);

  return (
    <Router>
      <TopBar />
      <Button onClick={() => {
        console.log(trip)
      }}>Debug</Button>
      <div>
        <Routes>
          <Route path="/about" element={<Segment />}>
          </Route>
          <Route path="/" element={<Dashboard trip={trip} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Segment() {

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className="App">
      <div className='container'>
        <Button variant="contained" endIcon={<AddIcon />} color="success">
          NEW SEGMENT
        </Button>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Active Segment</InputLabel>
          <Select
            value={age}
            onChange={handleChange}
            autoWidth
            label="Active Segment"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={2}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}



export default App;
