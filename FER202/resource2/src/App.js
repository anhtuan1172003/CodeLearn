import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentList from './components/StudentList';
import StudentGrades from './components/StudentGrades';
import SubjectList from './components/SubjectList';

function App() {
  return (
    <BrowserRouter>
      <div className="app" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Students Management</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
          <SubjectList />
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/student/:studentId" element={<StudentGrades />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;