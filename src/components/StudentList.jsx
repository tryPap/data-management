import React, { useState, useRef } from 'react';
import Student from './Student';
import ReactToPrint from 'react-to-print';
import PrintComponent from './PrintComponent';
import '../index.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [fields, setFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const printComponentRef = useRef();

  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  const handleNewFieldNameChange = (e) => {
    setNewFieldName(e.target.value);
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleNewFieldKeyPress = (e) => {
    if (e.key === 'Enter') {
      addField();
    }
  };

  const handleFieldKeyPress = (index, e) => {
    if (e.key === 'Enter') {
      if (index < fields.length - 1) {
        document.getElementById(`field-${index + 1}`).focus();
      } else {
        addStudent();
      }
    }
  };

  const addField = () => {
    if (newFieldName && !fields.some(field => field.name === newFieldName)) {
      setFields([...fields, { name: newFieldName, value: '' }]);
      setNewFieldName('');
      setTimeout(() => document.getElementById(`field-${fields.length}`).focus(), 0);
    }
  };

  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const addStudent = () => {
    if (fields.length > 0 && fields.every(field => field.value.trim())) {
      const newStudent = fields.reduce((acc, field) => {
        acc[field.name] = field.value.trim();
        return acc;
      }, {});
      setStudents([...students, newStudent]);
      setFields(fields.map(field => ({ ...field, value: '' })));
      setTimeout(() => document.getElementById(`field-0`).focus(), 0);
    }
  };

  const deleteAllStudents = () => {
    setStudents([]);
  };

  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const sortStudents = (criteria) => {
    if (!criteria) return; // Do nothing if the criteria is empty
    if (!students.length) return;

    if (!Object.keys(students[0]).includes(criteria)) {
      window.alert(`Key "${criteria}" does not exist`);
      return;
    }

    const sortedStudents = [...students].sort((a, b) => {
      return a[criteria].localeCompare(b[criteria]);
    });

    setStudents(sortedStudents);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Data Management</h1>
        <div id="newfield">
          <input
            type="text"
            placeholder="New Field Name"
            value={newFieldName}
            onChange={handleNewFieldNameChange}
            onKeyPress={handleNewFieldKeyPress}
          />

          <button id="addfield" onClick={addField}>Add Field</button>
        </div>
        <div className="input-group">
          {fields.map((field, index) => (
            <div key={index} className="field-container">
              <input
                id={`field-${index}`}
                type="text"
                placeholder={field.name}
                value={field.value}
                onChange={(e) => handleFieldChange(index, e.target.value)}
                onKeyPress={(e) => handleFieldKeyPress(index, e)}
              />
              <button className="delete-field-button" onClick={() => deleteField(index)}>Delete</button>
            </div>
          ))}
          <button id="addentry" onClick={addStudent}>Add Entry</button>
          <div className="button-group">
            <button onClick={deleteAllStudents}>Delete All Entries</button>
          </div>
        </div>
        <div className="input-p-sort">
        <div className="p1">
         <p>Sort Your Data</p>
          </div>
        <div className='input-sort'>
          <input
            type="text"
            placeholder="Sort Option"
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
          />
          <button className="sort" onClick={() => sortStudents(sortCriteria)}>Sort</button>
        </div>
        </div>

        <ReactToPrint
          trigger={() => <button className="print">Print</button>}
          content={() => printComponentRef.current}
        />
      </div>
      <div className="main-content">
        <div className="student-list">
          {students.map((student, index) => (
            <Student key={index} student={student} index={index} deleteStudent={deleteStudent} />
          ))}
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <PrintComponent ref={printComponentRef} students={students} />
      </div>
    </div>
  );
};

export default StudentList;
