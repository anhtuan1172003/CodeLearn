import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component_1/Header';
import Main from './component_1/Main';
import Footer from './component_1/Footer';
import { Container } from 'react-bootstrap';
import Header2 from './component_2/Header2';
import Main2 from './component_2/Main2';
import ABC from './component_1/Nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Container>
      <ABC />
      <Main />
    </Container>
    <Footer />
    <hr />
    <Header2 />
    <Container>
      <Main2 />
    </Container>
  </React.StrictMode>
);