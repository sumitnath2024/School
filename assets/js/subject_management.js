document.addEventListener('DOMContentLoaded', function() {
  const subjectNameInput = document.getElementById('subjectName');
  const classSelect = document.getElementById('classSelect');
  const subjectList = document.getElementById('subjectList');

  // Function to fetch subject list
  function fetchSubjectList() {
    // Fetch data from the database (replace with actual database call)
    const subjects = [
      { subject_id: 'SUB1', class_id: '1', name: 'Math' },
      { subject_id: 'SUB2', class_id: '2', name: 'Science' }
    ];

    subjectList.innerHTML = '';
    subjects.forEach(subject => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${subject.subject_id}: Class ${subject.class_id}, Subject ${subject.name}`;
      subjectList.appendChild(listItem);
    });
  }

  // Function to add a new subject
  function addSubject(event) {
    event.preventDefault();

    const newSubject = {
      subject_id: generateUniqueId('SUB', subjectList.childElementCount + 1),
      class_id: classSelect.value,
      name: subjectNameInput.value
    };

    // Add to database (replace with actual database call)
    console.log('Adding subject:', newSubject);

    // Append to subject list
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${newSubject.subject_id}: Class ${newSubject.class_id}, Subject ${newSubject.name}`;
    subjectList.appendChild(listItem);

    // Clear input fields
    subjectNameInput.value = '';
  }

  // Function to generate unique IDs
  function generateUniqueId(prefix, id) {
    return `${prefix}${id}`;
  }

  // Load subject list when the page is loaded
  fetchSubjectList();

  // Add event listener to the form
  document.getElementById('subjectManagementForm').addEventListener('submit', addSubject);
});
