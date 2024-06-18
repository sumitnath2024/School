document.addEventListener('DOMContentLoaded', function() {
  fetchClasses();
  fetchSections();
});

function fetchClasses() {
  // Fetch classes from Firebase (this should be configured to match your database structure)
  var classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  var classSelect = document.getElementById('class');
  classes.forEach(classItem => {
    var option = document.createElement('option');
    option.value = classItem;
    option.text = classItem;
    classSelect.add(option);
  });
}

function fetchSections() {
  // Fetch sections from Firebase (this should be configured to match your database structure)
  var sections = ['A', 'B', 'C', 'D', 'E'];
  var sectionSelect = document.getElementById('section');
  sections.forEach(sectionItem => {
    var option = document.createElement('option');
    option.value = sectionItem;
    option.text = sectionItem;
    sectionSelect.add(option);
  });
}

function addStudent() {
  var studentData = {
    student_id: document.getElementById('student_id').value,
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    email: document.getElementById('email').value,
    contact_no: document.getElementById('contact_no').value,
    dob: document.getElementById('dob').value,
    parent_name: document.getElementById('parent_name').value,
    parent_contact_no: document.getElementById('parent_contact_no').value,
    class: document.getElementById('class').value,
    section: document.getElementById('section').value,
    roll_no: document.getElementById('roll_no').value
  };

  firebase.firestore().collection('students').doc(studentData.student_id).set(studentData)
    .then(() => {
      alert('Student added successfully');
      fetchStudents();
    })
    .catch((error) => {
      console.error('Error adding student:', error);
      alert('Error adding student');
    });
}

function fetchStudents() {
  firebase.firestore().collection('students').get()
    .then((querySnapshot) => {
      var studentsTableBody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
      studentsTableBody.innerHTML = ''; // Clear existing data

      querySnapshot.forEach((doc) => {
        var student = doc.data();
        var row = studentsTableBody.insertRow();
        row.insertCell(0).textContent = student.student_id;
        row.insertCell(1).textContent = student.name;
        row.insertCell(2).textContent = student.address;
        row.insertCell(3).textContent = student.email;
        row.insertCell(4).textContent = student.contact_no;
        row.insertCell(5).textContent = student.dob;
        row.insertCell(6).textContent = student.parent_name;
        row.insertCell(7).textContent = student.parent_contact_no;
        row.insertCell(8).textContent = student.class;
        row.insertCell(9).textContent = student.section;
        row.insertCell(10).textContent = student.roll_no;
      });
    })
    .catch((error) => {
      console.error('Error fetching students:', error);
    });
}

function updateStudent() {
  var studentId = document.getElementById('student_id').value;
  var studentData = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    email: document.getElementById('email').value,
    contact_no: document.getElementById('contact_no').value,
    dob: document.getElementById('dob').value,
    parent_name: document.getElementById('parent_name').value,
    parent_contact_no: document.getElementById('parent_contact_no').value,
    class: document.getElementById('class').value,
    section: document.getElementById('section').value,
    roll_no: document.getElementById('roll_no').value
  };

  firebase.firestore().collection('students').doc(studentId).update(studentData)
    .then(() => {
      alert('Student updated successfully');
      fetchStudents();
    })
    .catch((error) => {
      console.error('Error updating student:', error);
      alert('Error updating student');
    });
}

function deleteStudent() {
  var studentId = document.getElementById('student_id').value;

  firebase.firestore().collection('students').doc(studentId).delete()
    .then(() => {
      alert('Student deleted successfully');
      fetchStudents();
    })
    .catch((error) => {
      console.error('Error deleting student:', error);
      alert('Error deleting student');
    });
}
