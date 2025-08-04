import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:9999/subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  return (
    <div className="subjects-list">
      <h3>Subjects</h3>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            to={`/student?subjectId=${subject.subjectId}`}
            style={{ marginBottom: '8px', color: '#0066cc', textDecoration: 'none' }}
          >
            {subject.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
