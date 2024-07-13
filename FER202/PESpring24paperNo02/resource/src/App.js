import {Container} from 'react-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Projects from './Project';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employess from './Employee';
import Edits from './Edit';
function App() {
  return (
    <Container>
      <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Projects/>}/>
        <Route path ="/departments/:id/employees" element={<Employess/>}/>
        <Route path ="/projects/edit/:id" element={<Edits/>}/>


      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
