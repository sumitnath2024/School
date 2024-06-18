document.addEventListener('DOMContentLoaded', function() {
    const eventNameInput = document.getElementById('event_name');
    const eventDateInput = document.getElementById('event_date');
    const eventDescriptionInput = document.getElementById('event_description');
    const eventListTable = document.getElementById('event_list_table').getElementsByTagName('tbody')[0];

    function addEvent() {
        const eventName = eventNameInput.value;
        const eventDate = eventDateInput.value;
        const eventDescription = eventDescriptionInput.value;

        if (!eventName || !eventDate || !eventDescription) {
            alert("Please fill in all event details.");
            return;
        }

        firebase.firestore().collection('events').add({
            name: eventName,
            date: eventDate,
            description: eventDescription
        }).then(() => {
            alert("Event added successfully.");
            fetchEventList();
        }).catch(error => {
            console.error('Error adding event:', error);
            alert("Error adding event. Please try again.");
        });
    }

    function fetchEventList() {
        firebase.firestore().collection('events').get().then(snapshot => {
            eventListTable.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const row = eventListTable.insertRow();
                row.insertCell(0).textContent = data.name;
                row.insertCell(1).textContent = new Date(data.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                row.insertCell(2).textContent = data.description;
            });
        }).catch(error => {
            console.error('Error fetching event list:', error);
            alert("Error fetching event list. Please try again.");
        });
    }

    document.querySelector('button[onclick="addEvent()"]').addEventListener('click', addEvent);

    fetchEventList();
});
