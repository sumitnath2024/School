document.addEventListener('DOMContentLoaded', function() {
    const interactionListSelect = document.getElementById('interaction_list');
    const interactionDetailsTable = document.getElementById('interaction_details_table').getElementsByTagName('tbody')[0];

    function fetchInteractions() {
        // Fetch interaction list from Firebase or your database
        firebase.firestore().collection('interactions').get().then(snapshot => {
            interactionListSelect.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = `${data.parent_name} - ${data.teacher_name} (${data.date})`;
                interactionListSelect.appendChild(option);
            });
        });
    }

    function fetchInteractionDetails() {
        const interactionId = interactionListSelect.value;

        if (!interactionId) {
            alert("Please select an interaction.");
            return;
        }

        // Fetch interaction details from Firebase Firestore
        firebase.firestore().collection('interactions').doc(interactionId).get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                interactionDetailsTable.innerHTML = '';
                const row = interactionDetailsTable.insertRow();
                row.insertCell(0).textContent = data.parent_name;
                row.insertCell(1).textContent = data.teacher_name;
                row.insertCell(2).textContent = data.date;
                row.insertCell(3).textContent = data.notes;
            } else {
                alert("No details found for this interaction.");
            }
        }).catch(error => {
            console.error('Error fetching interaction details:', error);
            alert("Error fetching interaction details. Please try again.");
        });
    }

    document.querySelector('button[onclick="fetchInteractions()"]').addEventListener('click', fetchInteractions);
    interactionListSelect.addEventListener('change', fetchInteractionDetails);

    fetchInteractions();
});
