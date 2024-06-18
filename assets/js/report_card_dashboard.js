document.addEventListener('DOMContentLoaded', function() {
    loadClasses();
    loadSections();
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
    const classSelect = document.getElementById('class');
    classSelect.addEventListener('change', function() {
        const classId = classSelect.value;
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
    });
}

function fetchReportCards() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;

    if (classId === '' || sectionId === '') {
        alert('Please select a class and section.');
        return;
    }

    const db = firebase.firestore();
    db.collection('report_cards').where('class_id', '==', classId).where('section_id', '==', sectionId).get().then((querySnapshot) => {
        const reportCardTable = document.getElementById('reportCardTable').getElementsByTagName('tbody')[0];
        reportCardTable.innerHTML = ''; // Clear previous records
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const row = reportCardTable.insertRow();
            row.innerHTML = `
                <td>${record.student_id}</td>
                <td>${record.student_name}</td>
                <td>${record.class_name}</td>
                <td>${record.section_name}</td>
                <td>${record.subject}</td>
                <td>${record.marks}</td>
                <td>${record.grade}</td>
            `;
        });
    }).catch((error) => {
        console.error('Error fetching report cards:', error);
    });
}
