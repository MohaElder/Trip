import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Counter } from './features/counter/Counter';
import './App.css';
import Note from './components/note/note';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Button from "@mui/material/Button"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import './styles.css'

const pages = ['Dashboard', 'Trip Segment'];

function App() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    console.log("clicked")
    setAnchorElNav(null);
  };


  return (
    <Router>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<Dashboard />}>
          </Route>
          <Route path="/users" element={<Users />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Dashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}



function Home() {

  const addNote = () => {
    setNotes([...notes, { placeholder: 'write anything...', id: uuidv4() }])
  }

  const removeNote = (id: string) => {
    console.log("deleting ", id)
    setNotes(notes.filter(note => note.id !== id));
  }

  //don't put jsx inside. https://stackoverflow.com/a/62240641/15466075
  const [notes, setNotes] = useState(
    [
      {
        placeholder: 'I wanna go to...',
        id: uuidv4()
      },
      {
        placeholder: 'I wanna do...',
        id: uuidv4()
      },
    ]);

  const noteGrids = notes.map((note) =>
    <Grid xs={4} key={note.id}>
      <Note placeholder={note.placeholder} id={note.id} onDeleteClicked={removeNote} />
    </Grid>
  );

  return (
    <div>
      <Typography variant="h5" gutterBottom component="div" className='title'>
        Brainstorm Section
      </Typography>
      <Grid container spacing={4} sx={{ paddingLeft: 5, paddingRight: 5 }}>
        {noteGrids}
      </Grid>
      <Button className='note-button'
        onClick={addNote}
        sx={{
          borderStyle: 'dashed',
          borderWidth: 2,
          borderRadius: 24,
          borderColor: '#707070',
          marginTop: 5,
          color: '#707070',
        }}>ADD NEW NOTE</Button>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
