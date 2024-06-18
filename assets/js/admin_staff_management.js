document.addEventListener('DOMContentLoaded', function() {
    fetchAdminStaffs();
});

function fetchAdminStaffs() {
    const db = firebase.firestore();
    db.collection('admin_staff').get().then((querySnapshot) => {
        const adminStaffList = document.getElementById('adminStaffsTable').getElementsByTagName('tbody')[0];
        adminStaffList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const adminStaff = doc.data();
            const row = adminStaffList.insertRow();
            row.innerHTML = `
                <td>${adminStaff.staff_id}</td>
                <td>${adminStaff.name}</td>
                <td>${adminStaff.address}</td>
                <td>${adminStaff.email}</td>
                <td>${adminStaff.contact_no}</td>
                <td>${adminStaff.dob}</td>
                <td><button onclick="editAdminStaff('${doc.id}')">Edit</button></td>
            `;
        });
    });
}

function addAdminStaff() {
    const adminStaff = getAdminStaffFormData();
    const db = firebase.firestore();
    db.collection('admin_staff').add(adminStaff).then(() => {
        fetchAdminStaffs();
        clearForm();
    });
}

function updateAdminStaff() {
    const adminStaff = getAdminStaffFormData();
    const db = firebase.firestore();
    db.collection('admin_staff').doc(adminStaff.staff_id).update(adminStaff).then(() => {
        fetchAdminStaffs();
        clearForm();
    });
}

function deleteAdminStaff() {
    const staffId = document.getElementById('staff_id').value;
    const db = firebase.firestore();
    db.collection('admin_staff').doc(staffId).delete().then(() => {
        fetchAdminStaffs();
        clearForm();
    });
}

function getAdminStaffFormData() {
    return {
        staff_id: document.getElementById('staff_id').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        contact_no: document.getElementById('contact_no').value,
        dob: document.getElementById('dob').value
    };
}

function editAdminStaff(docId) {
    const db = firebase.firestore();
    db.collection('admin_staff').doc(docId).get().then((doc) => {
        if (doc.exists) {
            const adminStaff = doc.data();
            document.getElementById('staff_id').value = adminStaff.staff_id;
            document.getElementById('name').value = adminStaff.name;
            document.getElementById('address').value = adminStaff.address;
            document.getElementById('email').value = adminStaff.email;
            document.getElementById('contact_no').value = adminStaff.contact_no;
            document.getElementById('dob').value = adminStaff.dob;
        }
    });
}

function clearForm() {
    document.getElementById('adminStaffForm').reset();
}
