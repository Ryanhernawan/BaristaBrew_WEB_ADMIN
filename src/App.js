import logo from './logo.svg';
import './App.css';
import Kasir from './Pages/Kasir'
import ListOrder from './Pages/ListOrder';
import Recap from './Pages/Recap';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Minuman from './Pages/Minuman';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Kasir/>} />
            <Route path="/ListOrder" element={<ListOrder/>} />
            <Route path="/Recap" element={<Recap/>} />
            <Route path="/Minuman" element={<Minuman/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
