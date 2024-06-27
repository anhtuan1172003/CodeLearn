import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css';
import Ex51 from './components/Ex51';
import Ex52 from './components/Ex52';
import Ex53 from './components/Ex53';
import Ex55 from './components/Ex55';
import Ex8 from './components/Ex8';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Ex51/>
    <hr/>
    <Ex52/>
    <hr/>
    <Ex53/>
    <Ex55/>
    <br/>
    <br/>
    <br/>
    <Ex8/>
  </React.StrictMode>
);
