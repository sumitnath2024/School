document.addEventListener('DOMContentLoaded', function() {
  const classSelect = document.getElementById('classSelect');
  const sectionSelect = document.getElementById('sectionSelect');
  const subjectIdInput = document.getElementById('subjectId');
  
  // Function to fetch subjects
  function fetchSubjects() {
    // Fetch data from the database (replace with actual database call)
    const subjects = [
      { class_id: '1', name: 'Math' },
      { class_id: '2', name: 'Science' }
    ];

    subjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject.class_id;
      option.textContent = subject.name;
      classSelect.appendChild(option);
    });
  }

  // Function to update academic records
  function updateAcademicRecords(event) {
    event.preventDefault();
    
    const data = {
      class: classSelect.value,
      section: sectionSelect.value,
      subject_id: subjectIdInput.value
    };

    // Update data in the database (replace with actual database call)
    console.log('Updating academic records:', data);
  }

  // Load data when the page is loaded
  fetchSubjects();

  // Add event listener to the form
  document.getElementById('academicRecordsForm').addEventListener('submit', updateAcademicRecords);
});
