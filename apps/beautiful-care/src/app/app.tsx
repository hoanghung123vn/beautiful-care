import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Customers from '../pages/Customers';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';

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
          <Route path="/admin" element={<Layout />}>
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
