document.addEventListener('DOMContentLoaded', function() {
  const announcementTitleInput = document.getElementById('announcementTitle');
  const announcementContentInput = document.getElementById('announcementContent');
  const postAnnouncementBtn = document.getElementById('postAnnouncementBtn');
  const announcementList = document.getElementById('announcementList');

  // Function to fetch announcements
  function fetchAnnouncements() {
    // Fetch data from the database (replace with actual database call)
    const announcements = [
      { announcement_id: 'AN1', title: 'Exam Schedule', content: 'The exam schedule for the final exams has been published.', created_at: '2024-06-15' },
      { announcement_id: 'AN2', title: 'Holiday Notice', content: 'School will remain closed on 25th June for summer vacation.', created_at: '2024-06-15' }
    ];

    announcementList.innerHTML = '';
    announcements.forEach(announcement => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Title: ${announcement.title} - ${announcement.content} (Posted on ${announcement.created_at})`;
      announcementList.appendChild(listItem);
    });
  }

  // Function to post a new announcement
  function postAnnouncement() {
    const title = announcementTitleInput.value;
    const content = announcementContentInput.value;

    if (title && content) {
      // Add new announcement to the database (replace with actual database call)
      console.log('Announcement Posted:', { announcement_id: `AN${Math.floor(Math.random() * 1000)}`, title, content, created_at: new Date().toISOString() });

      // Clear form fields
      announcementTitleInput.value = '';
      announcementContentInput.value = '';

      // Fetch updated announcements
      fetchAnnouncements();
    } else {
      alert('Please fill all fields');
    }
  }

  // Event listener
  postAnnouncementBtn.addEventListener('click', postAnnouncement);

  // Fetch initial announcements
  fetchAnnouncements();
});
