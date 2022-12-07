import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Freeform from './Pages/FreeForm/FreeForm';
import Character from './Pages/Character/Character';
import Studio from './Pages/Studio/Studio';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/create_freeform'  element={<Freeform/>} />
        <Route path='/create_character' element={<Character/>} />
        <Route path='/studio' element={<Studio/>} />
      </Routes>
    </div>
  );
}

export default App;
