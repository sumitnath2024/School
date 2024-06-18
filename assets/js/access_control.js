document.addEventListener('DOMContentLoaded', function() {
    const roleSelect = document.getElementById('role');
    const permissionsDiv = document.getElementById('permissions');
    const rolesListTable = document.getElementById('roles_list_table').getElementsByTagName('tbody')[0];

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
                fetchPermissions();
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
                alert("Error fetching roles. Please try again.");
            });
    }

    function fetchPermissions() {
        const roleId = roleSelect.value;
        if (!roleId) return;

        firebase.firestore().collection('roles').doc(roleId).get()
            .then(doc => {
                const data = doc.data();
                permissionsDiv.innerHTML = '';
                data.permissions.forEach(permission => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = permission;
                    checkbox.checked = true;
                    const label = document.createElement('label');
                    label.textContent = permission;
                    permissionsDiv.appendChild(checkbox);
                    permissionsDiv.appendChild(label);
                    permissionsDiv.appendChild(document.createElement('br'));
                });
            })
            .catch(error => {
                console.error('Error fetching permissions:', error);
                alert("Error fetching permissions. Please try again.");
            });
    }

    function updatePermissions() {
        const roleId = roleSelect.value;
        if (!roleId) return;

        const checkboxes = permissionsDiv.getElementsByTagName('input');
        const permissions = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                permissions.push(checkboxes[i].value);
            }
        }

        firebase.firestore().collection('roles').doc(roleId).update({
            permissions: permissions
        })
        .then(() => {
            alert("Permissions updated successfully.");
            fetchRoles();
        })
        .catch(error => {
            console.error('Error updating permissions:', error);
            alert("Error updating permissions. Please try again.");
        });
    }

    roleSelect.addEventListener('change', fetchPermissions);

    fetchRoles();
});
