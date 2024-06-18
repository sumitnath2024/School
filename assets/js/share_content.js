document.addEventListener('DOMContentLoaded', function() {
    const classSelect = document.getElementById('class');
    const sectionSelect = document.getElementById('section');
    const sharedContentTable = document.getElementById('shared_content_table').getElementsByTagName('tbody')[0];

    function fetchClassesAndSections() {
        // Fetch classes and sections from Firebase or your database
        firebase.firestore().collection('classes_sections').get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();
                const classOption = document.createElement('option');
                classOption.value = data.class_id;
                classOption.textContent = data.class_name;
                classSelect.appendChild(classOption);

                const sectionOption = document.createElement('option');
                sectionOption.value = data.section_id;
                sectionOption.textContent = data.section_name;
                sectionSelect.appendChild(sectionOption);
            });
        });
    }

    function shareContent() {
        const contentTitle = document.getElementById('content_title').value;
        const contentFile = document.getElementById('content_file').files[0];
        const classValue = classSelect.value;
        const sectionValue = sectionSelect.value;

        if (!contentTitle || !contentFile || !classValue || !sectionValue) {
            alert("Please fill all the fields.");
            return;
        }

        // Upload file to Firebase Storage
        const storageRef = firebase.storage().ref();
        const contentRef = storageRef.child(`content/${contentFile.name}`);
        contentRef.put(contentFile).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                // Save content details to Firebase Firestore
                firebase.firestore().collection('shared_content').add({
                    title: contentTitle,
                    fileUrl: downloadURL,
                    class: classValue,
                    section: sectionValue,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    alert("Content shared successfully!");
                    fetchSharedContent();
                }).catch(error => {
                    console.error('Error sharing content:', error);
                    alert("Error sharing content. Please try again.");
                });
            });
        });
    }

    function fetchSharedContent() {
        firebase.firestore().collection('shared_content').orderBy('timestamp', 'desc').get().then(snapshot => {
            sharedContentTable.innerHTML = '';
            snapshot.forEach(doc => {
                const content = doc.data();
                const row = sharedContentTable.insertRow();
                row.insertCell(0).textContent = content.title;
                row.insertCell(1).textContent = content.class;
                row.insertCell(2).textContent = content.section;
                const fileCell = row.insertCell(3);
                const fileLink = document.createElement('a');
                fileLink.href = content.fileUrl;
                fileLink.textContent = 'View';
                fileLink.target = '_blank';
                fileCell.appendChild(fileLink);
                row.insertCell(4).textContent = content.timestamp ? content.timestamp.toDate().toLocaleString() : '';
            });
        }).catch(error => {
            console.error('Error fetching shared content:', error);
        });
    }

    document.querySelector('button[onclick="shareContent()"]').addEventListener('click', shareContent);

    fetchClassesAndSections();
    fetchSharedContent();
});
