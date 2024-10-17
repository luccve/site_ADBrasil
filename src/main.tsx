import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ContextMapProvider from './contexts/index.tsx';


// Rota para deploy adbrasil_site


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextMapProvider>
      <BrowserRouter basename={"/site_ADBrasil/"}>
        <Routes>
          <Route path="/" element={<><Nav /><App /><Footer /></>} />
          <Route path="/map" element={<><Map /></>} />
          <Route path="/balance" element={<><Nav /><Balance /><Footer /></>} />
          <Route path="/catalogo" element={<><Nav /><Catalog /><Footer /></>} />
          <Route path="/ptf" element={<><Nav /><Ptf /><Footer /></>} />
          <Route path="/edu" element={<><Nav /><Educacional /><Footer /></>} />
          <Route path="*" element={<><Nav /><NotFound /><Footer /></>} />

        </Routes>
      </BrowserRouter>

    </ContextMapProvider>
  </React.StrictMode >
);
