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

function fetchAssignments() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;

    if (classId === '' || sectionId === '') {
        alert('Please select a class and section.');
        return;
    }

    const db = firebase.firestore();
    db.collection('assignments').where('class_id', '==', classId).where('section_id', '==', sectionId).get().then((querySnapshot) => {
        const assignmentList = document.getElementById('assignment_list');
        assignmentList.innerHTML = ''; // Clear previous list
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${record.assignment_name} - ${record.due_date}`;
            assignmentList.appendChild(li);
        });
    }).catch((error) => {
        console.error('Error fetching assignments:', error);
    });
}
