import React from 'react';
import ReactDOM from 'react-dom/client';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Footer from './components/footer/index.tsx';
import Nav from './components/nav/index.tsx';

import Map from './pages/map/index.tsx';
import NotFound from './components/notFound/index.tsx';
import Catalog from './pages/catalogo/index.tsx';
import Ptf from './pages/ptf/index.tsx';
import Balance from './pages/balance/index.tsx';
import Educacional from './pages/educacional/index.tsx';


let basename="/";

if(import.meta.env._ENV !== "DEV"){
  basename = import.meta.env.BASENAME_GITHUB
  console.log(basename)
}




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<><Nav/><App /><Footer/></>} />
        <Route path="/map" element={<><Nav/><Map /><Footer/></>} />
        <Route path="/balance" element={<><Nav/><Balance /><Footer/></>} />
        <Route path="/catalogo" element={<><Nav/><Catalog /><Footer/></>} />
        <Route path="/ptf" element={<><Nav/><Ptf /><Footer/></>} />
        <Route path="/edu" element={<><Nav/><Educacional /><Footer/></>} />
        <Route path="*" element={<><Nav/><NotFound /><Footer/></>} />
        
      </Routes>
    </BrowserRouter>
    

  </React.StrictMode>
);
