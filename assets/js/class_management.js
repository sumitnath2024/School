document.addEventListener('DOMContentLoaded', function() {
  const classNameInput = document.getElementById('className');
  const classList = document.getElementById('classList');

  // Function to fetch class list
  function fetchClassList() {
    // Fetch data from the database (replace with actual database call)
    const classes = [
      { class_id: 'C1', name: 'Class 1' },
      { class_id: 'C2', name: 'Class 2' }
    ];

    classList.innerHTML = '';
    classes.forEach(cls => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${cls.class_id}: ${cls.name}`;
      classList.appendChild(listItem);
    });
  }

  // Function to add a new class
  function addClass(event) {
    event.preventDefault();

    const newClass = {
      class_id: generateUniqueId('C', classList.childElementCount + 1),
      name: classNameInput.value
    };

    // Add to database (replace with actual database call)
    console.log('Adding class:', newClass);

    // Append to class list
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = `${newClass.class_id}: ${newClass.name}`;
    classList.appendChild(listItem);

    // Clear input field
    classNameInput.value = '';
  }

  // Function to generate unique IDs
  function generateUniqueId(prefix, id) {
    return `${prefix}${id}`;
  }

  // Load class list when the page is loaded
  fetchClassList();

  // Add event listener to the form
  document.getElementById('classManagementForm').addEventListener('submit', addClass);
});
