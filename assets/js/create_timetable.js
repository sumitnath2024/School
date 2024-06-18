document.addEventListener('DOMContentLoaded', function() {
    loadClasses();
    loadSubjects();
    loadTeachers();
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

function loadSubjects() {
    const db = firebase.firestore();
    db.collection('subjects').get().then((querySnapshot) => {
        const subjectSelect = document.getElementById('subject');
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            subjectSelect.add(option);
        });
    });
}

function loadTeachers() {
    const db = firebase.firestore();
    db.collection('teachers').get().then((querySnapshot) => {
        const teacherSelect = document.getElementById('teacher');
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            teacherSelect.add(option);
        });
    });
}

function loadTimetable() {
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
        console.error('Error loading timetable:', error);
    });
}

function saveTimetable() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const day = document.getElementById('day').value;
    const period = document.getElementById('period').value;
    const subject = document.getElementById('subject').value;
    const teacher = document.getElementById('teacher').value;

    const db = firebase.firestore();
    const timetableRef = db.collection('classes').doc(classId).collection('sections').doc(sectionId).collection('timetable').doc(`${day}_${period}`);

    timetableRef.set({
        day: day,
        period: period,
        subject: subject,
        teacher: teacher
    }).then(() => {
        loadTimetable();
        clearForm();
    }).catch((error) => {
        console.error('Error saving timetable:', error);
    });
}

function clearForm() {
    document.getElementById('timetableForm').reset();
}
