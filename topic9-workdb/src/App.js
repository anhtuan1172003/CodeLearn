import logo from './logo.svg';
import './App.css';
import Product from './components/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './components/detail';
import CreateProduct from './components/create';
import EditProduct from './components/edit';
import AddBrands from './components/addbrands';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Product/>} />
        <Route path='/product/' element={<Product/>} />
        <Route path='/product/:pId' element={<Detail/>} />
        <Route path='/product/create' element={<CreateProduct/>} />
        <Route path='/product/edit/:id' element={<EditProduct/>} />
        <Route path='/product/addbrands/:id' element={<AddBrands/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
