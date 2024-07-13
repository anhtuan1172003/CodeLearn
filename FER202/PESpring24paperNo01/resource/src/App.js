import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Projects  from './Project';
import Employees from './Employees';
import Add from './Addproject';
import { BrowserRouter ,Router, Routes, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
function App() {
 
  return (
    // <div>
    //   <Projects/>
    //  <hr/>
    // </div>
    <Container>
    <BrowserRouter>
          <div className="container mt-3">
              <Routes>
                  <Route path="/" element={<Projects/>} />
                  <Route path="/departments/:id/employees" element={<Employees/>} />
                  <Route path="/projects/add" element={<Add/>} />
              </Routes>
          </div>
      </BrowserRouter>
      </Container>
  );
}

export default App;


  