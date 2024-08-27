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
  const [showInstructions, setShowInstructions] = useState(false);
  const printComponentRef = useRef();

  // Update field value
  const handleFieldChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].value = value;
    setFields(newFields);
  };

  // Handle new field name input change
  const handleNewFieldNameChange = (e) => {
    setNewFieldName(e.target.value);
  };

  // Handle sort criteria input change
  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
     // Check if Enter key is pressed

  };

  const handleSortCriteriaKeyPress = (e) => {
    if (e.key === 'Enter') {
      sortStudents(sortCriteria); // Call the sort function when Enter is pressed
    }
  };

  // Handle 'Enter' key press on new field input
  const handleNewFieldKeyPress = (e) => {
    if (e.key === 'Enter') {
      addField();
    }
  };

  // Handle 'Enter' key press on field inputs
  const handleFieldKeyPress = (index, e) => {
    if (e.key === 'Enter') {
      if (index < fields.length - 1) {
        document.getElementById(`field-${index + 1}`).focus();
      } else {
        addStudent();
      }
    }
  };

  // Add new field
  const addField = () => {
    if (newFieldName && !fields.some(field => field.name === newFieldName)) {
      setFields([...fields, { name: newFieldName, value: '' }]);
      setNewFieldName('');
      setTimeout(() => document.getElementById(`field-${fields.length}`).focus(), 0);
    }
  };

  // Delete field
  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Add new student
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

  // Delete all students
  const deleteAllStudents = () => {
    setStudents([]);
  };

  // Delete all fields
  const deleteAllFields = () => {
    setFields([]);
  };

  // Delete a single student
  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  // Sort students by criteria
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

  // Toggle instructions visibility
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  // Handle drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
    e.target.classList.add('dragging');
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newFields = [...fields];
    const [draggedField] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, draggedField);
    setFields(newFields);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h1>Data Management</h1>
        <div className='instructions'>
          <button onClick={toggleInstructions}>Hit For Instructions</button>
          {showInstructions && (
            <p>
              Add new fields by entering a name in the "New Field" input and clicking "Add Field".
              You can sort your fields by drag and drop them in the order you want.
              If your fields are filled, click "Add Data" to add a data entry.
              For sorting, enter the name of the field by which you want to sort the data
              and click "Sort". Additionally, you can print the student list by clicking the "Print" button.
            </p>
          )}
        </div>
        <div id="newfield">
          <input
            type="text"
            placeholder="New Field:"
            value={newFieldName}
            onChange={handleNewFieldNameChange}
            onKeyPress={handleNewFieldKeyPress}
          />
          <button id="addfield" onClick={addField}>Add Field</button>
        </div>
        <hr />
        <div className="input-group">
          <ul>
            {fields.map((field, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="field-container">
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
              </li>
            ))}
          </ul>
        </div>
        <div className="button-group">
          <button id="addentry" onClick={addStudent}>Add Data</button>
          <button id='deteledata' onClick={deleteAllStudents}>Delete All Data</button>
          <button id='deletefields' onClick={deleteAllFields}>Delete All Fields</button>
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
              onKeyPress={handleSortCriteriaKeyPress}
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
        <h1>Welcome to the Data Management React App!</h1>
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
