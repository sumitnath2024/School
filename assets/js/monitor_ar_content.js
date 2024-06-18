document.addEventListener('DOMContentLoaded', function() {
    const classInput = document.getElementById('class');
    const sectionInput = document.getElementById('section');
    const arContentTable = document.getElementById('ar_content_table').getElementsByTagName('tbody')[0];

    function fetchARContent() {
        const selectedClass = classInput.value;
        const selectedSection = sectionInput.value;

        if (!selectedClass || !selectedSection) {
            alert("Please select both class and section.");
            return;
        }

        firebase.firestore().collection('ar_content')
            .where('class', '==', selectedClass)
            .where('section', '==', selectedSection)
            .get()
            .then(snapshot => {
                arContentTable.innerHTML = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const row = arContentTable.insertRow();
                    row.insertCell(0).textContent = data.class;
                    row.insertCell(1).textContent = data.section;
                    row.insertCell(2).textContent = data.content;
                    row.insertCell(3).textContent = data.status;
                });
            })
            .catch(error => {
                console.error('Error fetching AR content:', error);
                alert("Error fetching AR content. Please try again.");
            });
    }

    document.querySelector('button[onclick="fetchARContent()"]').addEventListener('click', fetchARContent);

    // Optionally, populate class and section dropdowns here

});
