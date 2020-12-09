import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

import Bingo from './controllers/Bingo.js';

function App() {

  const bingo = new Bingo();
  const card = bingo.generateCard();
  console.log(card);
  return (
    <div> Hello </div>
  );
}

export default App;
