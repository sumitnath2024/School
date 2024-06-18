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

function fetchAttendanceRecords() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const date = document.getElementById('date').value;
    const db = firebase.firestore();
    const attendanceRef = db.collection('classes').doc(classId).collection('sections').doc(sectionId).collection('attendance').doc(date);

    attendanceRef.get().then((doc) => {
        if (doc.exists) {
            const attendanceData = doc.data().attendance;
            const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
            attendanceTable.innerHTML = ''; // Clear previous records
            attendanceData.forEach((record) => {
                const row = attendanceTable.insertRow();
                row.innerHTML = `
                    <td>${record.student_id}</td>
                    <td>${record.name}</td>
                    <td>${record.roll_no}</td>
                    <td>${record.present ? 'Yes' : 'No'}</td>
                `;
            });
        } else {
            console.log('No attendance records found for the selected date.');
        }
    }).catch((error) => {
        console.error('Error fetching attendance records:', error);
    });
}

function generateAttendanceReport() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const date = document.getElementById('date').value;
    const db = firebase.firestore();
    const attendanceRef = db.collection('classes').doc(classId).collection('sections').doc(sectionId).collection('attendance').doc(date);

    attendanceRef.get().then((doc) => {
        if (doc.exists) {
            const attendanceData = doc.data().attendance;
            const csvContent = "data:text/csv;charset=utf-8,Student ID,Name,Roll No,Present\n" +
                attendanceData.map(e => `${e.student_id},${e.name},${e.roll_no},${e.present ? 'Yes' : 'No'}`).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `attendance_report_${classId}_${sectionId}_${date}.csv`);
            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);
        } else {
            console.log('No attendance records found for the selected date.');
        }
    }).catch((error) => {
        console.error('Error generating attendance report:', error);
    });
}
