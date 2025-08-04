import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectId = queryParams.get('subjectId');

  useEffect(() => {
    fetchStudents();
  }, [subjectId]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:9999/students');
      const studentsData = await response.json();
      console.log('Students Data:', studentsData);
      const detailsResponse = await fetch('http://localhost:9999/student_details');
      const detailsData = await detailsResponse.json();
      console.log('Details Data:', detailsData);

      const combinedData = studentsData.map(student => {
        const details = detailsData.find(d => d.studentId === student.studentId);
        return {
          ...student,
          ...details?.address
        };
      });

      if (subjectId) {
        console.log('Filtering by Subject ID:', subjectId);
        const subjectsResponse = await fetch('http://localhost:9999/students_subjetcs');
        const subjectsData = await subjectsResponse.json();
        console.log('Subjects Data:', subjectsData);
        const studentIds = subjectsData
          .filter(item => item.subjectId === subjectId)
          .map(item => item.studentId);
        console.log('Filtered Student IDs:', studentIds);
        setStudents(combinedData.filter(s => studentIds.includes(s.studentId)));
      } else {
        setStudents(combinedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Enter student name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />
      
      <div className="student-table">
        <Table hover bordered striped>
          <thead>
            <tr>
              <th>StudentId</th>
              <th>Name</th>
              <th>Age</th>
              <th>Street</th>
              <th>City</th>
              <th>isRegularStudent</th>
              <th>View grades</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.street}</td>
                <td>{student.city}</td>
                <td>{student.isRegularStudent ? "Fulltime" : "Applicant"}</td>
                <td>
                  <Link to={`/student/${student.studentId}`}>Grades</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StudentList;
