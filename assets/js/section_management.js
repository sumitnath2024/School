document.addEventListener('DOMContentLoaded', function() {
  const classSelect = document.getElementById('classSelect');
  const sectionNameInput = document.getElementById('sectionName');
  const sectionList = document.getElementById('sectionList');

  // Function to fetch section list
  function fetchSectionList() {
    // Fetch data from the database (replace with actual database call)
    const sections = [
      { section_id: 'SEC1', class_id: '1', name: 'A' },
      { section_id: 'SEC2', class_id: '2', name: 'B' }
    ];

    sectionList.innerHTML = '';
    sections.forEach(section => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${section.section_id}: Class ${section.class_id}, Section ${section.name}`;
      sectionList.appendChild(listItem);
    });
  }

  // Function to add a new section
  function addSection(event) {
    event.preventDefault();

    const newSection = {
      section_id: generateUniqueId('SEC', sectionList.childElementCount + 1),
      class_id: classSelect.value,
      name: sectionNameInput.value
    };

    // Add to database (replace with actual database call)
    console.log('Adding section:', newSection);

    // Append to section list
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${newSection.section_id}: Class ${newSection.class_id}, Section ${newSection.name}`;
    sectionList.appendChild(listItem);

    // Clear input fields
    sectionNameInput.value = '';
  }

  // Function to generate unique IDs
  function generateUniqueId(prefix, id) {
    return `${prefix}${id}`;
  }

  // Load section list when the page is loaded
  fetchSectionList();

  // Add event listener to the form
  document.getElementById('sectionManagementForm').addEventListener('submit', addSection);
});
