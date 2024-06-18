document.addEventListener('DOMContentLoaded', function() {
  const classSelect = document.getElementById('classSelect');
  const sectionSelect = document.getElementById('sectionSelect');
  const subjectIdInput = document.getElementById('subjectId');
  const subjectList = document.getElementById('subjectList');

  // Function to fetch subjects
  function fetchSubjects() {
    // Fetch data from the database (replace with actual database call)
    const subjects = [
      { class_id: '1', name: 'Math' },
      { class_id: '2', name: 'Science' }
    ];

    subjectList.innerHTML = '';
    subjects.forEach(subject => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Class ${subject.class_id}, Subject ${subject.name}`;
      subjectList.appendChild(listItem);
    });
  }

  // Load subjects when the page is loaded
  fetchSubjects();

  // You can add additional functionality as required
});
