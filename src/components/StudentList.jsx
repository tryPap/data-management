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

<<<<<<< HEAD
  // Function to update a student's data
  const updateStudent = (index, updatedStudent) => {
    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    setStudents(updatedStudents);
  };
  
=======
>>>>>>> 3658c6ea706f6f52ed9aaacef4709cf4c33ddfb0
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
<<<<<<< HEAD
    

    const sortedStudents = [...students].sort((a, b) => {
      const aValue = String(a[criteria]);
      const bValue = String(b[criteria]);
  
      const isANumber = /^[0-9]+$/.test(aValue); // Check if aValue is a number
      const isBNumber = /^[0-9]+$/.test(bValue); // Check if bValue is a number
  
      if (isANumber && isBNumber) {
        // Both are numbers, sort numerically
        return Number(aValue) - Number(bValue);
      } else {
        // Otherwise, sort lexicographically as strings
        return aValue.localeCompare(bValue);
      }
    });
  
    setStudents(sortedStudents);
    return sortedStudents;
  };

  const reverseSort = () => {
    setStudents((prevStudents) => {
      const reversed = [...prevStudents].reverse();
      return reversed;
    });
  };
  
=======

    const sortedStudents = [...students].sort((a, b) => {
      return a[criteria].localeCompare(b[criteria]);
    });

    setStudents(sortedStudents);
  };
>>>>>>> 3658c6ea706f6f52ed9aaacef4709cf4c33ddfb0

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
<<<<<<< HEAD
              Enter a name in the "New Field" input box and click "Add Field" to create a new field.
              You can rearrange your fields by dragging and dropping them into your desired order.
              Once your fields are set, click "Add Data" to input new data.
              To sort the data, type the name of the field you'd like to sort by and click "Sort". You can reverse the sort order by clicking "Reverse Sort". Click the "Print" button to print the current list.
=======
              Add new fields by entering a name in the "New Field" input and clicking "Add Field".
              You can sort your fields by drag and drop them in the order you want.
              If your fields are filled, click "Add Data" to add a data entry.
              For sorting, enter the name of the field by which you want to sort the data
              and click "Sort". Additionally, you can print the student list by clicking the "Print" button.
>>>>>>> 3658c6ea706f6f52ed9aaacef4709cf4c33ddfb0
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
<<<<<<< HEAD
            <Student 
            key={index} 
            student={student} 
            index={index} 
            deleteStudent={deleteStudent}
            updateStudent={updateStudent}
            />
          ))}
        </div>
        
        <button className='reverseSortButton' onClick={reverseSort}>Reverse Sort</button>
      </div>
      <ReactToPrint
          trigger={() => <button className="printExtraButton">Print</button>}
          content={() => printComponentRef.current}
        />
=======
            <Student key={index} student={student} index={index} deleteStudent={deleteStudent} />
          ))}
        </div>
      </div>
>>>>>>> 3658c6ea706f6f52ed9aaacef4709cf4c33ddfb0
      <div style={{ display: 'none' }}>
        <PrintComponent ref={printComponentRef} students={students} />
      </div>
    </div>
  );
};

export default StudentList;
