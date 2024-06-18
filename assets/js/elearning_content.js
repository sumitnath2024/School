document.addEventListener('DOMContentLoaded', function() {
    const contentTitleInput = document.getElementById('content_title');
    const contentFileInput = document.getElementById('content_file');
    const classSelect = document.getElementById('class');
    const sectionSelect = document.getElementById('section');
    const integratedContentsTable = document.getElementById('integrated_contents_table').getElementsByTagName('tbody')[0];

    function integrateContent() {
        const contentTitle = contentTitleInput.value;
        const contentFile = contentFileInput.files[0];
        const classValue = classSelect.value;
        const sectionValue = sectionSelect.value;

        if (!contentTitle || !contentFile || !classValue || !sectionValue) {
            alert("Please fill in all fields.");
            return;
        }

        const storageRef = firebase.storage().ref('contents/' + contentFile.name);
        storageRef.put(contentFile).then(snapshot => {
            return snapshot.ref.getDownloadURL();
        }).then(downloadURL => {
            return firebase.firestore().collection('integrated_contents').add({
                content_title: contentTitle,
                content_file: downloadURL,
                class: classValue,
                section: sectionValue
            });
        }).then(() => {
            alert("Content integrated successfully.");
            fetchIntegratedContents();
        }).catch(error => {
            console.error('Error integrating content:', error);
            alert("Error integrating content. Please try again.");
        });
    }

    function fetchIntegratedContents() {
        firebase.firestore().collection('integrated_contents').get().then(snapshot => {
            integratedContentsTable.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const row = integratedContentsTable.insertRow();
                row.insertCell(0).textContent = data.content_title;
                row.insertCell(1).textContent = data.class;
                row.insertCell(2).textContent = data.section;
                const fileLink = document.createElement('a');
                fileLink.href = data.content_file;
                fileLink.textContent = 'View File';
                row.insertCell(3).appendChild(fileLink);
            });
        }).catch(error => {
            console.error('Error fetching integrated contents:', error);
            alert("Error fetching integrated contents. Please try again.");
        });
    }

    document.querySelector('button[onclick="integrateContent()"]').addEventListener('click', integrateContent);

    fetchIntegratedContents();
});
