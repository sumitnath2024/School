document.addEventListener('DOMContentLoaded', function() {
  const contentTitleInput = document.getElementById('contentTitle');
  const contentFileInput = document.getElementById('contentFile');
  const classSelect = document.getElementById('class');
  const sectionSelect = document.getElementById('section');
  const fetchContentBtn = document.getElementById('fetchContentBtn');

  // Function to fetch content
  function fetchContent() {
    const title = contentTitleInput.value;
    const file = contentFileInput.files[0];
    const classId = classSelect.value;
    const sectionId = sectionSelect.value;

    if (title && file && classId && sectionId) {
      // Add new content to the database (replace with actual database call)
      const fileUrl = URL.createObjectURL(file); // For demo purposes
      console.log('Content Fetched:', { title, fileUrl, class_id: classId, section_id: sectionId });

      // Clear form fields
      contentTitleInput.value = '';
      contentFileInput.value = '';
      classSelect.value = '';
      sectionSelect.value = '';
    } else {
      alert('Please fill all fields and upload a file');
    }
  }

  // Event listener
  fetchContentBtn.addEventListener('click', fetchContent);
});
