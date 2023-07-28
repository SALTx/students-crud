import { useState, useEffect } from "react";
import "./App.css";

const URL = "http://localhost:3000/api/students";
const HEADERS = {
  "Content-Type": "application/json",
};

function App() {
  const [students, setStudents] = useState([]);
  const [updatingStudent, setUpdatingStudent] = useState(null);

  //! Get students
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [students]);

  //! Add student
  const handleAdd = () => {
    let id = document.getElementById("id").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;

    // Validate ID to be 8 characters long and can only contain letters and numbers
    if (!/^[a-zA-Z0-9]{8}$/.test(id)) {
      alert("ID must be 8 characters long and can only contain letters and numbers");
      return;
    }

    // Check that it is unique
    if (students.some((student) => student.id === id)) {
      alert("ID must be unique");
      return;
    }

    // Validate first name
    firstName = firstName.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    if(firstName.length === 0 || firstName.length > 64) {
      alert("First name must be not null and less than 64 characters long");
      return;
    }

    // Validate last name
    lastName = lastName.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    if(lastName.length === 0 || lastName.length > 64) {
      alert("Last name must be not null and less than 64 characters long");
      return;
    }

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

  //! Delete student
  const handleDelete = (id) => {
    fetch(URL, {
      method: "DELETE",
      headers: HEADERS,
      body: JSON.stringify({ id }),
    })
    .then((res) => {
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    })
  }

    const handleUpdate = (id) => {
    const student = students.find((student) => student.id === id);
    setUpdatingStudent(student);
  };

  //! Save changes
  const handleSave = (id) => {
    const row = document.getElementById(`row-${id}`);
    const firstName = row.querySelector("#firstName").value;
    const lastName = row.querySelector("#lastName").value;

    fetch(URL, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({id, firstName, lastName }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedStudents = students.map((student) =>
          student.id === id ? data : student
        );
        setStudents(updatedStudents);
        setUpdatingStudent(null);
      })
      .catch((error) => console.error(error));
  };

  //! Cancel update
  const handleCancel = () => {
    setUpdatingStudent(null);
  };

  //! Students table
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
            <tr key={student.id} id={`row-${student.id}`}>
              <td>{student.id}</td>
              {updatingStudent?.id === student.id ? (
                <>
                  <td>
                    <input
                      id="firstName"
                      type="text"
                      className="form-control"
                      defaultValue={student.firstName}
                    />
                  </td>
                  <td>
                    <input
                      id="lastName"
                      type="text"
                      className="form-control"
                      defaultValue={student.lastName}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSave(student.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(student.id)}
                    >
                      Update
                    </button>
                  </td>
                </>
              )}
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
    </div>
  );
}

export default App;