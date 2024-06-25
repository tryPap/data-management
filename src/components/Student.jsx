import React from 'react';

const Student = ({ student, index, deleteStudent }) => {
  return (
    <div className="student-item">
      <div className="student-info">
        {Object.keys(student).map(key => (
          <div key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {student[key].charAt(0).toUpperCase() + student[key].slice(1)}</div>
        ))}
      </div>
      <button className="delete-button" onClick={() => deleteStudent(index)}>Delete</button>
    </div>
  );
};

export default Student;
