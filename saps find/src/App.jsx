import React from 'react';
import './App.css';
import Header from './Components/Header.jsx';
import Content from './Components/Content.jsx';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import About from './pages/About.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
              <div>
                <Header />
                <Content />
              </div>
          } />
          <Route path='/about' element={
              <div>
                <Header />
                <About />
              </div>
          } />
  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
