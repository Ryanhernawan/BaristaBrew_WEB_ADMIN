import logo from './logo.svg';
import './App.css';
import Kasir from './Pages/Kasir'
import ListOrder from './Pages/ListOrder';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Kasir/>} />
            <Route path="/ListOrder" element={<ListOrder/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
