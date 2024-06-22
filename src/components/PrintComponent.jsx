import React from 'react';

const PrintComponent = React.forwardRef((props, ref) => {
  const { students } = props;
  
  return (
    <div ref={ref} className="print-container">
      <h2>To Be Printed</h2>
      {students.map((student, index) => (
        <div key={index} className="print-student">
          {Object.keys(student).map(key => (
            <div key={key}><strong>{key}:</strong> {student[key]}</div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default PrintComponent;
