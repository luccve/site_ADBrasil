import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Footer from './components/footer/index.tsx';
import Nav from './components/nav/index.tsx';

const Map = lazy(() => import('./pages/map/index.tsx'));

const Catalog = lazy(() => import('./pages/catalogo/index.tsx'));
const Ptf = lazy(() => import('./pages/ptf/index.tsx'));
const Balance = lazy(() => import('./pages/balance/index.tsx'));
const Educacional = lazy(() => import('./pages/educacional/index.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/map',
    element: <Map />,
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
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Nav />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
