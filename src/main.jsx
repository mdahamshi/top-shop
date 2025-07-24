import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './LoadingOverly.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {routefromelement} from './pages/routes'
const router = createBrowserRouter(routefromelement);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

const initialLoader = document.getElementById('initial-loader');
if (initialLoader) {
  initialLoader.remove();
}