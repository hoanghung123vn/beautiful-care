import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from '../pages/Customers';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import Login from './Login';
import Customer from '../pages/Customer';
import Services from '../pages/Services';
import Service from '../pages/Service';
import Combos from '../pages/Combos';
import Combo from '../pages/Combo';
import Orders from '../pages/Orders';
import Order from '../pages/Order';
import Dashboard from '../pages/Dashboard';

export function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={1000}
        theme="dark"
        bodyClassName="text-center"
        closeButton={false}
        limit={1}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="customers/create" element={<Customer />} />
            <Route path="customers/:id" element={<Customer />} />
            <Route path="services" element={<Services />} />
            <Route path="services/create" element={<Service />} />
            <Route path="services/:id" element={<Service />} />
            <Route path="combos" element={<Combos />} />
            <Route path="combos/create" element={<Combo />} />
            <Route path="combos/:id" element={<Combo />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/create" element={<Order />} />
            <Route path="orders/:id" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
