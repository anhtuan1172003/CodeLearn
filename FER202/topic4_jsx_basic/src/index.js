import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import HelloWorld, { Hello } from './HelloWorld';
import Section, { Button } from './components/Nested';
import MyComponent from './components/Namespace';
import PrinData from './components/PassingDataToComponent';
const root = ReactDOM.createRoot(document.getElementById('root'));

//Giả định dữ liệu được lấy về từ Database
const students = [
  {"id": 1, "name": "Trần Anh Tuấn", "age": 20, "gender": true},
  {"id": 2, "name": "Trần Xuân Tiềm", "age": 22, "gender": true},
  {"id": 3, "name": "Trần Hương Ly", "age": 27, "gender": false}
]


root.render(
  <React.StrictMode>
    {/* <HelloWorld/>
    <Hello/> */}
    <Section>
      {/* Không có thẻ div vẫn được */}
      {/* <div>Hello section component</div> */}
      <Button>Click Me</Button>
    </Section>
    
    <MyComponent>
      <MyComponent.TheFirst/>
      <MyComponent.TheSecond/>
    </MyComponent>
    <hr/>
    {/* <PrinData title = "List of Students" data = "Hello World">Create new Student</PrinData> */}
    <PrinData title = "List of Students" data = {students}>Create new Student</PrinData>
  </React.StrictMode>
);
