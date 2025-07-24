import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './LoadingOverly.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routefromelement } from './pages/routes';
const router = createBrowserRouter(routefromelement);
import { AppContext } from './context/AppContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext.Provider
      value={{
        appName: 'SaraShop',
        productsPath: '/products',
        happyCustomers: 3821,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  </StrictMode>
);

const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.remove();
}
