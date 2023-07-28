import { useState, useEffect } from "react";
import "./App.css";

function StudentsTable({ students }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-warning">Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleGetStudents = () => {
    fetch("http://localhost:3000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  return (
    <div className="App">
      <h1>React CRUD</h1>
      <StudentsTable students={students} />
      <button className="btn btn-primary" onClick={handleGetStudents}>
        GET
      </button>
    </div>
  );
}

export default App;