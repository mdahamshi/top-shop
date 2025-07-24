import { createRoutesFromElements, Route } from 'react-router-dom';
import Errorpage from './Errorpage';
import Root from './Root';
import Home from './Home';
import Product, { loader as productLoader } from './Product';
import Shop, { loader as shopLoader } from './Shop';

export const routefromelement = createRoutesFromElements(
  <Route path="/" element={<Root appName="SaraShop" />}>
    <Route errorElement={<Errorpage />}>
      <Route index element={<Home />} />
      <Route element={<Home />} path="/home" />
      <Route
        loader={productLoader}
        element={<Product />}
        path="/products/:productId"
      />
      <Route loader={shopLoader} element={<Shop />} path="/shop" />
      <Route path="*" element={<Errorpage />} />
    </Route>
  </Route>
);
