document.addEventListener('DOMContentLoaded', function() {
    loadClasses();
});

function loadClasses() {
    const db = firebase.firestore();
    db.collection('classes').get().then((querySnapshot) => {
        const classSelect = document.getElementById('class');
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            classSelect.add(option);
        });
    });
}

function loadSections() {
    const classId = document.getElementById('class').value;
    const db = firebase.firestore();
    db.collection('classes').doc(classId).collection('sections').get().then((querySnapshot) => {
        const sectionSelect = document.getElementById('section');
        sectionSelect.innerHTML = '<option value="">Select Section</option>'; // Clear previous sections
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            sectionSelect.add(option);
        });
    });
}

function fetchTimetables() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const db = firebase.firestore();
    const timetableTable = document.getElementById('timetableTable').getElementsByTagName('tbody')[0];

    db.collection('classes').doc(classId).collection('sections').doc(sectionId).collection('timetable').get().then((querySnapshot) => {
        timetableTable.innerHTML = ''; // Clear previous records
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const row = timetableTable.insertRow();
            row.innerHTML = `
                <td>${record.day}</td>
                <td>${record.period}</td>
                <td>${record.subject}</td>
                <td>${record.teacher}</td>
            `;
        });
    }).catch((error) => {
        console.error('Error fetching timetables:', error);
    });
}
