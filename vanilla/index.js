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
      console.log(err);
      alert("Error adding student: " + err);
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
    error: function (xhr, status, error) {
      alert("Error: " + error);
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
    error: function (xhr, status, error) {
      alert("Error: " + error);
    }
  });
}

//! render
function renderTable() {
  tbody.html("");
  students.forEach((student) => {
    tbody.append(`
            <tr>
                <td>${student.id}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>
                    <button id="delete" class="btn btn-danger delete" data-id="${student.id}">Delete</button>
                    <button id="update" class="btn btn-warning update" data-id="${student.id}">Update</button>
                </td>
            </tr>
        `);
  });
  tbody.append(`
        <tr>
            <td><input id="id" type="text" class="form-control" placeholder="id"></td>
            <td><input id="firstName" type="text" class="form-control" placeholder="first name"></td>
            <td><input id="lastName" type="text" class="form-control" placeholder="last name"></td>
            <td><button id="add" class="btn btn-success">Add</button></td>
        </tr>
    `);
}

//! Delete student
tbody.on("click", ".delete", function () {
  console.log("Deleting student with id: " + $(this).attr("data-id") + "...");
  let id = $(this).attr("data-id");
  deleteStudent(id);
});

//! Update student
tbody.on("click", ".update", function () {
  // turn the row into an input form
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

  // validate id
  if (!/^[a-zA-Z0-9]{8}$/.test(id)) {
    alert("Error: ID must be 8 characters long and can only contain letters and numbers.");
    return;
  }

  // validate first name
  firstName = firstName.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  // if (firstName.length > 64) {
  //   alert("Error: First name must be 64 characters or less.");
  //   return;
  // }

  // validate last name
  lastName = lastName.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  if (lastName.length > 64) {
    alert("Error: Last name must be 64 characters or less.");
    return;
  }

  addStudent(id, firstName, lastName);
});