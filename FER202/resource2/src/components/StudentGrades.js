import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const StudentGrades = () => {
  const { studentId } = useParams();
  const [grades, setGrades] = useState([]);
  const [student, setStudent] = useState(null);
  const [newGrade, setNewGrade] = useState({ grade: '', additionalExplanation: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStudentAndGrades();
  }, [studentId]);

  const fetchStudentAndGrades = async () => {
    try {
      // Fetch student details
      const studentResponse = await fetch(`http://localhost:9999/students?studentId=${studentId}`);
      const studentData = await studentResponse.json();
      setStudent(studentData[0]);

      // Fetch grades
      const gradesResponse = await fetch(`http://localhost:9999/evaluations?studentId=${studentId}`);
      const gradesData = await gradesResponse.json();
      setGrades(gradesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    
    if (!newGrade.grade || !newGrade.additionalExplanation) {
      setError('Grade and additional explanation are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:9999/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          grade: parseFloat(newGrade.grade),
          additionalExplanation: newGrade.additionalExplanation,
        }),
      });

      if (response.ok) {
        setSuccess('Grade added successfully');
        setNewGrade({ grade: '', additionalExplanation: '' });
        fetchStudentAndGrades();
        setError('');
      }
    } catch (error) {
      setError('Error adding grade');
      console.error('Error:', error);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/" className="back-button" style={{ 
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        Back to Home
      </Link>

      <h2>{student.name}'s Grade Details:</h2>

      <div className="add-grade-form" style={{ marginBottom: '20px' }}>
        <h3>Add a new grade</h3>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Enter grade"
            value={newGrade.grade}
            onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })}
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Enter additional explanation"
            value={newGrade.additionalExplanation}
            onChange={(e) => setNewGrade({ ...newGrade, additionalExplanation: e.target.value })}
            style={{ padding: '8px', flex: 1 }}
          />
          <button
            onClick={handleAddGrade}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add new
          </button>
        </div>
      </div>

      <Table hover bordered striped>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Explanation</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td>{grade.grade}</td>
              <td>{grade.additionalExplanation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentGrades;
