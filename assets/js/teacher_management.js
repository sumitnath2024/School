document.addEventListener('DOMContentLoaded', function() {
    fetchTeachers();
});

function fetchTeachers() {
    const db = firebase.firestore();
    db.collection('teachers').get().then((querySnapshot) => {
        const teacherList = document.getElementById('teacher-list');
        teacherList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const teacher = doc.data();
            const teacherDiv = document.createElement('div');
            teacherDiv.innerHTML = `
                <p><strong>ID:</strong> ${teacher.teacher_id}</p>
                <p><strong>Name:</strong> ${teacher.name}</p>
                <p><strong>Address:</strong> ${teacher.address}</p>
                <p><strong>Email:</strong> ${teacher.email}</p>
                <p><strong>Contact No:</strong> ${teacher.contact_no}</p>
                <p><strong>Date of Birth:</strong> ${teacher.dob}</p>
                <p><strong>Subjects:</strong> ${teacher.subjects.join(', ')}</p>
                <p><strong>Classes:</strong> ${teacher.classes.join(', ')}</p>
                <button onclick="editTeacher('${doc.id}')">Edit</button>
            `;
            teacherList.appendChild(teacherDiv);
        });
    });
}

function addTeacher() {
    const teacher = getTeacherFormData();
    const db = firebase.firestore();
    db.collection('teachers').add(teacher).then(() => {
        fetchTeachers();
        clearForm();
    });
}

function updateTeacher() {
    const teacher = getTeacherFormData();
    const db = firebase.firestore();
    db.collection('teachers').doc(teacher.teacher_id).update(teacher).then(() => {
        fetchTeachers();
        clearForm();
    });
}

function deleteTeacher() {
    const teacherId = document.getElementById('teacher_id').value;
    const db = firebase.firestore();
    db.collection('teachers').doc(teacherId).delete().then(() => {
        fetchTeachers();
        clearForm();
    });
}

function getTeacherFormData() {
    return {
        teacher_id: document.getElementById('teacher_id').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        contact_no: document.getElementById('contact_no').value,
        dob: document.getElementById('dob').value,
        subjects: document.getElementById('subjects').value.split(','),
        classes: document.getElementById('classes').value.split(',')
    };
}

function editTeacher(docId) {
    const db = firebase.firestore();
    db.collection('teachers').doc(docId).get().then((doc) => {
        if (doc.exists) {
            const teacher = doc.data();
            document.getElementById('teacher_id').value = teacher.teacher_id;
            document.getElementById('name').value = teacher.name;
            document.getElementById('address').value = teacher.address;
            document.getElementById('email').value = teacher.email;
            document.getElementById('contact_no').value = teacher.contact_no;
            document.getElementById('dob').value = teacher.dob;
            document.getElementById('subjects').value = teacher.subjects.join(', ');
            document.getElementById('classes').value = teacher.classes.join(', ');
        }
    });
}

function clearForm() {
    document.getElementById('teacher-form').reset();
}
