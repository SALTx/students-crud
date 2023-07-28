const URL = "http://localhost:3000/api/students";
let tbody = $("tbody");
let students = [];

getStudents();

//! get
function getStudents() {
  $.ajax({
    url: URL,
    method: "GET",
    success: function (data) {
      students = data;
      renderTable();
    },
    error: function (xhr, status, error) {
      alert("Error: " + error);
    }
  });
}

//! post
function addStudent(id, firstName, lastName) {
  $.ajax({
    url: URL,
    method: "POST",
    data: {
      id: id,
      firstName: firstName,
      lastName: lastName,
    },
    success: function (data) {
      students.push(data);
      getStudents();
    },
    error: function (err) {
      const errorCode = JSON.parse(err.responseText).code;
      alert("Error adding student: " + errorCode);
    }
  });
}

//! put
function updateStudent(id, firstName, lastName) {
  $.ajax({
    url: URL,
    method: "PUT",
    data: {
      id: id,
      firstName: firstName,
      lastName: lastName,
    },
    success: function (data) {
      let index = students.findIndex((student) => student.id == id);
      students[index] = data;
      getStudents();
    },
    error: function (err) {
      const errorCode = JSON.parse(err.responseText).code;
      alert("Error updating student: " + errorCode);
    }
  });
}

//! delete
function deleteStudent(id) {
  $.ajax({
    url: URL,
    method: "DELETE",
    data: {
      id: id,
    },
    success: function (data) {
      let index = students.findIndex((student) => student.id == id);
      students.splice(index, 1);
      getStudents();
    },
    error: function (err) {
      const errorCode = JSON.parse(err.responseText).code;
      alert("Error deleting student: " + errorCode);
    }
  });
}

//* render
function renderTable() {
  tbody.html("");
  students.forEach((student) => {
    tbody.append(`
            <tr>
                <td>${student.id}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>
                    <button class="btn btn-danger delete mr-1" data-id="${student.id}">Delete</button>
                    <button class="btn btn-warning update ml-1" data-id="${student.id}">Update</button>
                </td>
            </tr>
        `);
  });
  tbody.append(`
        <tr>
            <td><input id="id" type="text" class="form-control" placeholder="ID"></td>
            <td><input id="firstName" type="text" class="form-control" placeholder="First name"></td>
            <td><input id="lastName" type="text" class="form-control" placeholder="Last name"></td>
            <td><button id="add" class="btn btn-success">Add</button></td>
        </tr>
    `);
}

//! Delete student
tbody.on("click", ".delete", function () {
  console.log("Deleting student with ID: " + $(this).attr("data-id") + "...");
  let id = $(this).attr("data-id");
  deleteStudent(id);
});

//! Update student
tbody.on("click", ".update", function () {
  let id = $(this).attr("data-id");
  let row = $(this).parent().parent();
  let firstName = row.find("td:nth-child(2)").text();
  let lastName = row.find("td:nth-child(3)").text();
  row.html(`
        <td>${id}</td>
        <td><input id="firstName" type="text" class="form-control" value="${firstName}"></td>
        <td><input id="lastName" type="text" class="form-control" value="${lastName}"></td>
        <td>
            <button id="save" class="btn btn-primary save" data-id="${id}">Save</button>
            <button id="cancel" class="btn btn-secondary cancel" data-id="${id}">Cancel</button>
        </td>
    `);
});

//! Save update
tbody.on("click", ".save", function () {
  let id = $(this).attr("data-id");
  let row = $(this).parent().parent();
  let firstName = row.find("#firstName").val();
  let lastName = row.find("#lastName").val();
  updateStudent(id, firstName, lastName);
});

//! Cancel update
tbody.on("click", ".cancel", function () {
  renderTable();
});

//! Add student
tbody.on("click", "#add", function () {
  let id = $("#id").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();

  // Validate ID to be 8 characters long and can only contain letters and numbers
  if (!/^[a-zA-Z0-9]{8}$/.test(id)) {
    alert("Error: ID must be 8 characters long and can only contain letters and numbers.");
    return;
  }

  // Check that it is unique
  if (students.some((student) => student.id == id)) {
    alert("Error: ID must be unique.");
    return;
  }

  // Validate first name
  firstName = firstName.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  if (firstName.length > 64) {
    alert("Error: First name must be 64 characters or less.");
    return;
  }

  // Validate last name
  lastName = lastName.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  if (lastName.length > 64) {
    alert("Error: Last name must be 64 characters or less.");
    return;
  }

  addStudent(id, firstName, lastName);
});