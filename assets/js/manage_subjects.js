document.addEventListener('DOMContentLoaded', function() {
  const subjectNameInput = document.getElementById('subjectName');
  const classSelect = document.getElementById('classSelect');
  const subjectList = document.getElementById('subjectList');

  // Function to fetch subject list
  function fetchSubjectList() {
    // Fetch data from the database (replace with actual database call)
    const subjects = [
      { class_id: '1', name: 'Math' },
      { class_id: '2', name: 'Science' }
    ];

    subjectList.innerHTML = '';
    subjects.forEach(subject => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${subject.class_id}: ${subject.name}`;
      subjectList.appendChild(listItem);
    });
  }

  // Function to add a new subject
  function addSubject(event) {
    event.preventDefault();

    const newSubject = {
      class_id: classSelect.value,
      name: subjectNameInput.value
    };

    // Add to database (replace with actual database call)
    console.log('Adding subject:', newSubject);

    // Append to subject list
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${newSubject.class_id}: ${newSubject.name}`;
    subjectList.appendChild(listItem);

    // Clear input fields
    subjectNameInput.value = '';
  }

  // Load subject list when the page is loaded
  fetchSubjectList();

  // Add event listener to the form
  document.getElementById('manageSubjectsForm').addEventListener('submit', addSubject);
});
