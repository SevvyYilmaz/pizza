import React from 'react';
import './App.css';
import CreatePizza from './components/CreatePizza';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import DisplayPizzas from './components/DisplayPizzas';

function App() {
  const [pizzas, setPizzas] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/new" element={<CreatePizza/>}/>
          <Route path="/" element={<DisplayPizzas pizzas={pizzas} setPizzas={setPizzas}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
