import React, { useState } from "react";
import "./App.css";

/**
 * {
 *    id,
 *    name,
 *    isPresent
 * }
 *
 */

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);
  // {} === {} -->false

  const addStudent = (event, name) => {
    event.preventDefault(); // for dom perpas
    if (name) {
      const newStudent = {
        id: Date.now(),
        name,
      };
      setStudents([newStudent, ...students]);
      setStudentName("");
    } else {
      alert(" please provide a valid student name");
    }
  };

  const updadeHandler = (event, name) => {
    event.preventDefault();
    if (name) {
      editableStudent.name = name || editableStudent.name;
      setStudentName("");
      setIsEditable(false);
      setStudentName(null);
    } else {
      alert(" please provide a valid student name");
    }
  };

  const deleteHandler = (studentId) => {
    const newStudentList = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(newStudentList);
  };

  const editHandler = (studentId) => {
    setIsEditable(true);
    const student = students.find((item) => item.id === studentId);
    setEditableStudent(student);
    setStudentName(student.name);
  };

  const presentHandler = (studentId) => {
    const student = students.find((item) => item.id === studentId)
    if(student.isPresent === undefined){
      student.isPresent = true
      setStudents ([...students])
    }else if (student.isPresent === true) {
      alert(" The student is alreaqdy in teh present list") 

    } else{
      alert(" The student is alreaqdy in teh absent list")
    }
  }

  const absentHandler = (studentId) => {
    const student = students.find((item) => item.id === studentId)
    if(student.isPresent === undefined){
      student.isPresent = false
      setStudents ([...students])
    }else if (student.isPresent === false) {
      alert(" The student is alreaqdy in teh absent list") 

    } else{
      alert(" The student is alreaqdy in teh present list")
    }

  }

  const toggletHandler = (studentId) => {
    const student = students.find((item) => item.id === studentId)
    student.isPresent = !student.isPresent
    setStudents ([...students])
  }

  return (
    <div className="App">
      <form>
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          type="text"
          name="student-name"
        />
        <button
          onClick={(e) =>
            isEditable
              ? updadeHandler(e, studentName)
              : addStudent(e, studentName)
          }
        >
          {isEditable ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="students">
        <div className="all-student">
          <h2>All Students</h2>
          <ul>
            {students.map((student) => (
              <li>
                <span>{student.name}</span>
                <button onClick={() => editHandler(student.id)}>Edit</button>
                <button onClick={() => deleteHandler(student.id)}> Delete</button>
                <button onClick={()=> presentHandler(student.id)} >Present</button>
                <button onClick={()=> absentHandler(student.id)} >Absent</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="present-student">
          <h2>
           Present-student
           </h2>
            <ul>
              {students.filter(item => item.isPresent === true).map(student =>(
                <li>
                  <span>
                    {student.name}
                    <button onClick={()=> toggletHandler(student.id)} >Accidentally Add</button>
                  </span>
                </li>
              ))}
            </ul>
        </div>
        <div className="absent-student">
          <h2>
            Absent-student
          </h2>
          <ul>
              {students.filter(item => item.isPresent === false).map(student =>(
                <li>
                  <span>
                    {student.name}
                  </span>
                  <button onClick={()=> toggletHandler(student.id)} >Accidentally Add</button>
                  
                </li>
              ))}
            </ul>
            
             </div>
      </div>
    </div>
  );
};

export default App;
