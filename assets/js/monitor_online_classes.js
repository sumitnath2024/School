document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchClassList();
    fetchSectionList();
});

function fetchOnlineClasses() {
    const selectedClass = document.getElementById('class').value;
    const selectedSection = document.getElementById('section').value;
    const onlineClassList = document.getElementById('online_class_list').value;

    if (!selectedClass || !selectedSection || !onlineClassList) {
        alert('Please provide all necessary details.');
        return;
    }

    const db = firebase.firestore();
    const onlineClassesTableBody = document.getElementById('online_classes_table').getElementsByTagName('tbody')[0];
    onlineClassesTableBody.innerHTML = ''; // Clear previous online classes list

    db.collection('online_classes').where('class', '==', selectedClass).where('section', '==', selectedSection).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const onlineClass = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${onlineClass.class}</td>
                <td>${onlineClass.section}</td>
                <td>${onlineClass.subject}</td>
                <td>${onlineClass.teacher}</td>
                <td>${new Date(onlineClass.start_time.seconds * 1000).toLocaleString()}</td>
                <td>${new Date(onlineClass.end_time.seconds * 1000).toLocaleString()}</td>
                <td><a href="${onlineClass.link}" target="_blank">Join Class</a></td>
            `;
            onlineClassesTableBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching online classes: ', error);
    });
}

function fetchClassList() {
    const db = firebase.firestore();
    const classSelect = document.getElementById('class');
    classSelect.innerHTML = ''; // Clear previous class list

    db.collection('classes').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const classItem = doc.data();
            const option = document.createElement('option');
            option.value = classItem.name;
            option.textContent = classItem.name;
            classSelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching class list: ', error);
    });
}

function fetchSectionList() {
    const db = firebase.firestore();
    const sectionSelect = document.getElementById('section');
    sectionSelect.innerHTML = ''; // Clear previous section list

    db.collection('sections').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const sectionItem = doc.data();
            const option = document.createElement('option');
            option.value = sectionItem.name;
            option.textContent = sectionItem.name;
            sectionSelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching section list: ', error);
    });
}
