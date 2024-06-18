document.addEventListener('DOMContentLoaded', function() {
    const studentIdSelect = document.getElementById('student_id');
    const healthConditionInput = document.getElementById('health_condition');
    const healthRecordsTable = document.getElementById('health_records_table').getElementsByTagName('tbody')[0];

    function fetchStudents() {
        // Fetch student list from Firebase or your database
        firebase.firestore().collection('students').get().then(snapshot => {
            studentIdSelect.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${data.name} (${doc.id})`;
                studentIdSelect.appendChild(option);
            });
        });
    }

    function addHealthRecord() {
        const studentId = studentIdSelect.value;
        const healthCondition = healthConditionInput.value;

        if (!studentId || !healthCondition) {
            alert("Please fill in all fields.");
            return;
        }

        // Add health record to Firebase Firestore
        firebase.firestore().collection('health_records').add({
            student_id: studentId,
            health_condition: healthCondition,
            date: new Date().toISOString()
        }).then(() => {
            alert("Health record added successfully.");
            fetchHealthRecords();
        }).catch(error => {
            console.error('Error adding health record:', error);
            alert("Error adding health record. Please try again.");
        });
    }

    function fetchHealthRecords() {
        // Fetch health records from Firebase Firestore
        firebase.firestore().collection('health_records').get().then(snapshot => {
            healthRecordsTable.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const row = healthRecordsTable.insertRow();
                row.insertCell(0).textContent = data.student_id;
                row.insertCell(1).textContent = data.health_condition;
                row.insertCell(2).textContent = new Date(data.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            });
        }).catch(error => {
            console.error('Error fetching health records:', error);
            alert("Error fetching health records. Please try again.");
        });
    }

    document.querySelector('button[onclick="addHealthRecord()"]').addEventListener('click', addHealthRecord);

    fetchStudents();
    fetchHealthRecords();
});
