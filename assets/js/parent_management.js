document.addEventListener('DOMContentLoaded', function() {
    fetchParents();
});

function fetchParents() {
    const db = firebase.firestore();
    db.collection('parents').get().then((querySnapshot) => {
        const parentList = document.getElementById('parentsTable').getElementsByTagName('tbody')[0];
        parentList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const parent = doc.data();
            const row = parentList.insertRow();
            row.innerHTML = `
                <td>${parent.parent_id}</td>
                <td>${parent.name}</td>
                <td>${parent.address}</td>
                <td>${parent.email}</td>
                <td>${parent.contact_no}</td>
                <td>${parent.dob}</td>
                <td>${parent.children.join(', ')}</td>
                <td><button onclick="editParent('${doc.id}')">Edit</button></td>
            `;
        });
    });
}

function addParent() {
    const parent = getParentFormData();
    const db = firebase.firestore();
    db.collection('parents').add(parent).then(() => {
        fetchParents();
        clearForm();
    });
}

function updateParent() {
    const parent = getParentFormData();
    const db = firebase.firestore();
    db.collection('parents').doc(parent.parent_id).update(parent).then(() => {
        fetchParents();
        clearForm();
    });
}

function deleteParent() {
    const parentId = document.getElementById('parent_id').value;
    const db = firebase.firestore();
    db.collection('parents').doc(parentId).delete().then(() => {
        fetchParents();
        clearForm();
    });
}

function getParentFormData() {
    return {
        parent_id: document.getElementById('parent_id').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        contact_no: document.getElementById('contact_no').value,
        dob: document.getElementById('dob').value,
        children: document.getElementById('children').value.split(',')
    };
}

function editParent(docId) {
    const db = firebase.firestore();
    db.collection('parents').doc(docId).get().then((doc) => {
        if (doc.exists) {
            const parent = doc.data();
            document.getElementById('parent_id').value = parent.parent_id;
            document.getElementById('name').value = parent.name;
            document.getElementById('address').value = parent.address;
            document.getElementById('email').value = parent.email;
            document.getElementById('contact_no').value = parent.contact_no;
            document.getElementById('dob').value = parent.dob;
            document.getElementById('children').value = parent.children.join(', ');
        }
    });
}

function clearForm() {
    document.getElementById('parentForm').reset();
}
