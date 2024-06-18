document.addEventListener('DOMContentLoaded', function() {
  const examNameInput = document.getElementById('examName');
  const classSelect = document.getElementById('classSelect');
  const sectionSelect = document.getElementById('sectionSelect');
  const subjectSelect = document.getElementById('subjectSelect');
  const examDateInput = document.getElementById('examDate');
  const examList = document.getElementById('examList');

  // Function to fetch exam list
  function fetchExamList() {
    // Fetch data from the database (replace with actual database call)
    const exams = [
      { exam_id: 'E1', class_id: '1', section_id: 'A', subject_id: 'Math', exam_name: 'Mid Term', exam_date: '2024-06-20' },
      { exam_id: 'E2', class_id: '2', section_id: 'B', subject_id: 'Science', exam_name: 'Final Term', exam_date: '2024-07-15' }
    ];

    examList.innerHTML = '';
    exams.forEach(exam => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${exam.exam_id}: ${exam.exam_name} - ${exam.exam_date} (Class: ${exam.class_id}, Section: ${exam.section_id}, Subject: ${exam.subject_id})`;
      examList.appendChild(listItem);
    });
  }

  // Function to add a new exam schedule
  function addExamSchedule(event) {
    event.preventDefault();

    const newExam = {
      exam_id: generateUniqueId('E', examList.childElementCount + 1),
      class_id: classSelect.value,
      section_id: sectionSelect.value,
      subject_id: subjectSelect.value,
      exam_name: examNameInput.value,
      exam_date: examDateInput.value
    };

    // Add to database (replace with actual database call)
    console.log('Adding exam schedule:', newExam);

    // Append to exam list
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${newExam.exam_id}: ${newExam.exam_name} - ${newExam.exam_date} (Class: ${newExam.class_id}, Section: ${newExam.section_id}, Subject: ${newExam.subject_id})`;
    examList.appendChild(listItem);

    // Clear input fields
    examNameInput.value = '';
    examDateInput.value = '';
  }

  // Function to generate unique IDs
  function generateUniqueId(prefix, id) {
    return `${prefix}${id}`;
  }

  // Load exam list when the page is loaded
  fetchExamList();

  // Add event listener to the form
  document.getElementById('examScheduleForm').addEventListener('submit', addExamSchedule);
});
