import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

  },
  {
    path: '/map',
    element: <Map />
  },
  {
    path: '/balance',
    element: <Balance />,
  },
  {
    path: '/ptf',
    element: <Ptf />,
  },
  {
    path: '/catalogo',
    element: <Catalog />,

  },
  {
    path: '/edu',
    element: <Educacional />,
  }
  ,
  {
    path: '*',
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Nav />
    <RouterProvider router={router} />
    <Footer />

  </React.StrictMode>
);
