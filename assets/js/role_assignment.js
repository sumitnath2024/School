document.addEventListener('DOMContentLoaded', function() {
    const userSelect = document.getElementById('user_id');
    const roleSelect = document.getElementById('role');
    const usersListTable = document.getElementById('users_list_table').getElementsByTagName('tbody')[0];

    function fetchUsers() {
        firebase.firestore().collection('users').get()
            .then(snapshot => {
                userSelect.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const option = document.createElement('option');
                    option.value = doc.id;
                    option.textContent = data.name || doc.id;
                    userSelect.appendChild(option);
                });
                fetchRoles();
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                alert("Error fetching users. Please try again.");
            });
    }

    function fetchRoles() {
        firebase.firestore().collection('roles').get()
            .then(snapshot => {
                roleSelect.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const option = document.createElement('option');
                    option.value = doc.id;
                    option.textContent = data.name;
                    roleSelect.appendChild(option);
                });
                fetchUsersList();
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
                alert("Error fetching roles. Please try again.");
            });
    }

    function assignRole() {
        const userId = userSelect.value;
        const roleId = roleSelect.value;
        if (!userId || !roleId) return;

        firebase.firestore().collection('users').doc(userId).update({
            role: roleId
        })
        .then(() => {
            alert("Role assigned successfully.");
            fetchUsersList();
        })
        .catch(error => {
            console.error('Error assigning role:', error);
            alert("Error assigning role. Please try again.");
        });
    }

    function fetchUsersList() {
        firebase.firestore().collection('users').get()
            .then(snapshot => {
                usersListTable.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const row = usersListTable.insertRow();
                    row.insertCell(0).textContent = doc.id;
                    row.insertCell(1).textContent = data.role || 'N/A';
                });
            })
            .catch(error => {
                console.error('Error fetching users list:', error);
                alert("Error fetching users list. Please try again.");
            });
    }

    userSelect.addEventListener('change', fetchRoles);

    fetchUsers();
});
