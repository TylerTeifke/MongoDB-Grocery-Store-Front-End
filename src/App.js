import Home from './pages/Home';
import Search from './pages/Search';
import Create from './pages/Create';
import Update from './pages/Update';
import Delete from './pages/Delete';
import SearchAll from './pages/search_menus/Search_All';
import SearchOne from './pages/search_menus/Search_One';
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
