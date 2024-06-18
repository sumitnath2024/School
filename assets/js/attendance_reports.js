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

function generateAttendanceReport() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    const db = firebase.firestore();
    const attendanceTable = document.getElementById('attendanceReportTable').getElementsByTagName('tbody')[0];

    db.collection('classes').doc(classId).collection('sections').doc(sectionId).collection('attendance')
        .where('date', '>=', startDate)
        .where('date', '<=', endDate)
        .get().then((querySnapshot) => {
            attendanceTable.innerHTML = ''; // Clear previous records
            querySnapshot.forEach((doc) => {
                const attendanceData = doc.data().attendance;
                attendanceData.forEach((record) => {
                    const row = attendanceTable.insertRow();
                    row.innerHTML = `
                        <td>${doc.id}</td>
                        <td>${record.student_id}</td>
                        <td>${record.name}</td>
                        <td>${record.roll_no}</td>
                        <td>${record.present ? 'Yes' : 'No'}</td>
                    `;
                });
            });
        }).catch((error) => {
            console.error('Error generating attendance report:', error);
        });
}
