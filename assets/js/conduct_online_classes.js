document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchClassList();
    fetchSectionList();
    fetchSubjectList();
    fetchActiveClasses();
});

function startClass() {
    const selectedClass = document.getElementById('class').value;
    const selectedSection = document.getElementById('section').value;
    const selectedSubject = document.getElementById('subject').value;
    const startTime = document.getElementById('start_class').value;
    const endTime = document.getElementById('end_class').value;

    if (!selectedClass || !selectedSection || !selectedSubject || !startTime || !endTime) {
        alert('Please provide all necessary details.');
        return;
    }

    const db = firebase.firestore();
    db.collection('online_classes').add({
        class: selectedClass,
        section: selectedSection,
        subject: selectedSubject,
        start_time: firebase.firestore.Timestamp.fromDate(new Date(startTime)),
        end_time: firebase.firestore.Timestamp.fromDate(new Date(endTime)),
        status: 'Active'
    })
    .then(() => {
        alert('Class started successfully.');
        fetchActiveClasses();
    })
    .catch((error) => {
        console.error('Error starting class: ', error);
    });
}

function endClass() {
    const selectedClass = document.getElementById('class').value;
    const selectedSection = document.getElementById('section').value;
    const selectedSubject = document.getElementById('subject').value;

    if (!selectedClass || !selectedSection || !selectedSubject) {
        alert('Please provide all necessary details.');
        return;
    }

    const db = firebase.firestore();
    db.collection('online_classes').where('class', '==', selectedClass).where('section', '==', selectedSection).where('subject', '==', selectedSubject).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection('online_classes').doc(doc.id).update({ status: 'Ended' });
        });
        alert('Class ended successfully.');
        fetchActiveClasses();
    })
    .catch((error) => {
        console.error('Error ending class: ', error);
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

function fetchSubjectList() {
    const db = firebase.firestore();
    const subjectSelect = document.getElementById('subject');
    subjectSelect.innerHTML = ''; // Clear previous subject list

    db.collection('subjects').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const subjectItem = doc.data();
            const option = document.createElement('option');
            option.value = subjectItem.name;
            option.textContent = subjectItem.name;
            subjectSelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching subject list: ', error);
    });
}

function fetchActiveClasses() {
    const db = firebase.firestore();
    const activeClassesTableBody = document.getElementById('active_classes_table').getElementsByTagName('tbody')[0];
    activeClassesTableBody.innerHTML = ''; // Clear previous active classes list

    db.collection('online_classes').where('status', '==', 'Active').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const activeClass = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activeClass.class}</td>
                <td>${activeClass.section}</td>
                <td>${activeClass.subject}</td>
                <td>${new Date(activeClass.start_time.seconds * 1000).toLocaleString()}</td>
                <td>${new Date(activeClass.end_time.seconds * 1000).toLocaleString()}</td>
                <td>${activeClass.status}</td>
            `;
            activeClassesTableBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching active classes: ', error);
    });
}
