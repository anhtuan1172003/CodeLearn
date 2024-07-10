import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {Home, Contact, Header, ShowInfor} from "./components/index";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/info/:name/and/:age' element={<ShowInfor/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
