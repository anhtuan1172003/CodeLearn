import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Counter from './Counter';
import ListStudent from './Student';


const root = ReactDOM.createRoot(document.getElementById('root'));

const students = [
  { "id": 1, "name": "Nguyen Tuan", "age": 20, "major": "HE" },
  { "id": 2, "name": "Pham Huu Duc", "age": 25, "major": "HE" },
  { "id": 3, "name": "Dinh Hong", "age": 27, "major": "BA" },
  { "id": 4, "name": "HaiTung", "age": 30, "major": "NA" },
  { "id": 5, "name": "Nguyen Thi Tuoi", "age": 240, "major": "NA" },
]

const majors =[
  {"id": 1, "name": "HE"},
  {"id": 2, "name": "BA"},
  {"id": 3, "name": "NA"},
  {"id": 4, "name": "AU"}
]

root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Counter/> */}
    <ListStudent studentData={students} majorData={majors}/>
  </React.StrictMode>
);

