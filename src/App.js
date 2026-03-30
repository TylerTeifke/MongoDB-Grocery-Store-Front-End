import Home from './pages/Home';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
