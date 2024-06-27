import React from 'react';
import ReactDOM from 'react-dom/client';
//Khai bao thu vien cua botstrap su dung cho tat ca component
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Container>
      <Header/>
      <Main/>
      <Footer/>
    </Container>
  </React.StrictMode>
);
