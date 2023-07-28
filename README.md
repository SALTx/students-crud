# students-crud

## Description

Create a CRUD application using vanilla Javascript, HTML, and CSS
Then recreate the same application using different frameworks such as React, Vue, and Angular

## Database

Im using mysql for the database with a students table which consists of 3 columns. ID, firstName, and lastName

## Features

- Retrieve all students and display them in a table
- Add students through a form in the table which is the last row
  - validation for the form when adding
    - id should be 8 chars and only numbers and uppercase letters
    - firstName and lastName should only be letters and max length of 64
- Update a student with new values
- Delete a student

\*\*Maybe:

- Add a darkmode switch
- Add a search bar to search for a specific student

\*\* bugs

- Updating a student doesnt auto capitalize the first letter of the name
