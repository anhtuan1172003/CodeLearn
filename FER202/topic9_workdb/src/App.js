import './App.css';
import Product from './components/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './components/detail';
import CreateProduct from './components/create';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Product/>}/>
      <Route path='/product' element ={<Product/>}/>
      <Route path='/product/:pid' element ={<Detail/>}/>
      <Route path='/product/create' element ={<CreateProduct/>}/>
    </Routes>  
    </BrowserRouter>
  );
}

export default App;
