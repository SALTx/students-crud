import { useState, useEffect } from "react";
import "./App.css";

const URL = "http://localhost:3000/api/students";
const HEADERS = {
  "Content-Type": "application/json",
};

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [students]);

  const handleGetStudents = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  const handleAdd = () => {
    const id = document.getElementById("id").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    fetch(URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ id, firstName, lastName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);
        document.getElementById("id").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
      });
  };

  return (
    <div className="App">
      <h1>React CRUD</h1>
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
          <tr>
            <td>
              <input
                id="id"
                type="text"
                className="form-control"
                placeholder="ID"
              />
            </td>
            <td>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </td>
            <td>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </td>
            <td>
              <button id="add" className="btn btn-success" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleGetStudents}>
        GET
      </button>
    </div>
  );
}

export default App;