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

function postAssignment() {
    const classId = document.getElementById('class').value;
    const sectionId = document.getElementById('section').value;
    const assignmentTitle = document.getElementById('assignment_title').value;
    const assignmentDescription = document.getElementById('assignment_description').value;
    const dueDate = document.getElementById('due_date').value;

    if (classId === '' || sectionId === '' || assignmentTitle.trim() === '' || assignmentDescription.trim() === '' || dueDate === '') {
        alert('Please fill all the required fields.');
        return;
    }

    const db = firebase.firestore();
    db.collection('assignments').add({
        class_id: classId,
        section_id: sectionId,
        assignment_title: assignmentTitle,
        assignment_description: assignmentDescription,
        due_date: dueDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('assignmentForm').reset();
        alert('Assignment posted successfully.');
    }).catch((error) => {
        console.error('Error posting assignment:', error);
    });
}
