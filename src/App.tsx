import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Freeform from './Pages/FreeForm/FreeForm';
import Character from './Pages/Character/Character';
import Studio from './Pages/Studio/Studio';
import CreateCharacter from './Pages/CreateCharacter/CreateCharacter';

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/create_freeform'  element={<Freeform/>} />
        <Route path='/create_character' element={<Character/>} />
        <Route path='/panel' element={<Studio/>} />
        <Route path='/create-character' element={<CreateCharacter/>} />
      </Routes>
    </div>
  );
}

export default App;
