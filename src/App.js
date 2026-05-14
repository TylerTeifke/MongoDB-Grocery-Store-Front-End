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
import UpdateEmployees from './pages/update_menus/update_employees';
import UpdateEmployeeName from './pages/update_menus/update_employee_data/update_employee_name';
import UpdateSalary from './pages/update_menus/update_employee_data/update_salary';
import UpdateRegister from './pages/update_menus/update_employee_data/update_register';
import UpdatePosition from './pages/update_menus/update_employee_data/update_position';
import UpdateCustomerList from './pages/update_menus/update_employee_data/update_customer_list';
import UpdateCustomers from './pages/update_menus/update_customer';
import UpdateCustomerName from './pages/update_menus/update_customer_data/update_customer_name';
import UpdateCashier from './pages/update_menus/update_customer_data/update_cashier';
import AddProduct from './pages/update_menus/update_customer_data/add_products';
import RemoveProduct from './pages/update_menus/update_customer_data/remove_product';
import UpdateProducts from './pages/update_menus/update_product';
import UpdatePrice from './pages/update_menus/update_product_data/update_price';
import UpdateProductName from './pages/update_menus/update_product_data/update_name';
import UpdateType from './pages/update_menus/update_product_data/update_type';
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
          <Route path="/UpdateEmployees" element={<UpdateEmployees/>}/>
          <Route path="/UpdateEmployeeName" element={<UpdateEmployeeName/>}/>
          <Route path="/UpdateSalary" element={<UpdateSalary/>}/>
          <Route path="/UpdateRegister" element={<UpdateRegister/>}/>
          <Route path="/UpdatePosition" element={<UpdatePosition/>}/>
          <Route path="/UpdateCustomerList" element={<UpdateCustomerList/>}/>
          <Route path="/UpdateCustomers" element={<UpdateCustomers/>}/>
          <Route path="/UpdateCustomerName" element={<UpdateCustomerName/>}/>
          <Route path="/UpdateCashier" element={<UpdateCashier/>}/>
          <Route path="/AddProduct" element={<AddProduct/>}/>
          <Route path="/RemoveProduct" element={<RemoveProduct/>}/>
          <Route path="/UpdateProducts" element={<UpdateProducts/>}/>
          <Route path="/UpdatePrice" element={<UpdatePrice/>}/>
          <Route path="/UpdateProductName" element={<UpdateProductName/>}/>
          <Route path="/UpdateType" element={<UpdateType/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
