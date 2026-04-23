import Home from './pages/Home';
import Search from './pages/Search';
import Create from './pages/Create';
import Update from './pages/Update';
import Delete from './pages/Delete';
import SearchAll from './pages/search_menus/Search_All';
import SearchOne from './pages/search_menus/Search_One';
import SearchEmployees from './pages/search_menus/Search_Employees';
import SearchCustomers from './pages/search_menus/Search_Customers';
import CreateCustomer from './pages/create_menus/Create_Customer';
import CreateEmployee from './pages/create_menus/Create_Employee';
import CreateProduct from './pages/create_menus/Create_Product';
import AddToInventory from './pages/create_menus/Add_To_Inventory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Search" element={<Search/>}/>
          <Route path="/Create" element={<Create/>}/>
          <Route path="/Update" element={<Update/>}/>
          <Route path="/Delete" element={<Delete/>}/>
          <Route path="/SearchAll" element={<SearchAll/>}/>
          <Route path="/SearchOne" element={<SearchOne/>}/>
          <Route path="/SearchEmployees" element={<SearchEmployees/>}/>
          <Route path="/SearchCustomers" element={<SearchCustomers/>}/>
          <Route path="/CreateCustomer" element={<CreateCustomer/>}/>
          <Route path="/CreateEmployee" element={<CreateEmployee/>}/>
          <Route path="/CreateProduct" element={<CreateProduct/>}/>
          <Route path="/AddToInventory" element={<AddToInventory/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
