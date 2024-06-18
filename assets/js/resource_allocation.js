document.addEventListener('DOMContentLoaded', function() {
    const resourceNameInput = document.getElementById('resource_name');
    const allocationDateInput = document.getElementById('allocation_date');
    const allocatedResourcesTable = document.getElementById('allocated_resources_table').getElementsByTagName('tbody')[0];

    function allocateResource() {
        const resourceName = resourceNameInput.value;
        const allocationDate = allocationDateInput.value;

        if (!resourceName || !allocationDate) {
            alert("Please fill in all fields.");
            return;
        }

        // Add allocated resource to Firebase Firestore
        firebase.firestore().collection('allocated_resources').add({
            resource_name: resourceName,
            allocation_date: allocationDate
        }).then(() => {
            alert("Resource allocated successfully.");
            fetchAllocatedResources();
        }).catch(error => {
            console.error('Error allocating resource:', error);
            alert("Error allocating resource. Please try again.");
        });
    }

    function fetchAllocatedResources() {
        // Fetch allocated resources from Firebase Firestore
        firebase.firestore().collection('allocated_resources').get().then(snapshot => {
            allocatedResourcesTable.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const row = allocatedResourcesTable.insertRow();
                row.insertCell(0).textContent = data.resource_name;
                row.insertCell(1).textContent = new Date(data.allocation_date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
            });
        }).catch(error => {
            console.error('Error fetching allocated resources:', error);
            alert("Error fetching allocated resources. Please try again.");
        });
    }

    document.querySelector('button[onclick="allocateResource()"]').addEventListener('click', allocateResource);

    fetchAllocatedResources();
});
