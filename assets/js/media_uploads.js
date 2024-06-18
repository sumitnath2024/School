document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore and Storage
    const db = firebase.firestore();
    const storage = firebase.storage();
    fetchMediaList();
});

function uploadMedia() {
    const mediaTitle = document.getElementById('media_title').value;
    const mediaFile = document.getElementById('media_file').files[0];

    if (!mediaTitle || !mediaFile) {
        alert('Please provide both media title and file.');
        return;
    }

    const storageRef = firebase.storage().ref('media/' + mediaFile.name);
    const uploadTask = storageRef.put(mediaFile);

    uploadTask.on('state_changed', 
        function(snapshot) {
            // Handle progress
        }, 
        function(error) {
            console.error('Error uploading file: ', error);
        }, 
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                saveMediaToFirestore(mediaTitle, downloadURL);
            });
        }
    );
}

function saveMediaToFirestore(title, url) {
    const db = firebase.firestore();
    db.collection('media_uploads').add({
        title: title,
        url: url,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Media uploaded successfully.');
        fetchMediaList();
    })
    .catch((error) => {
        console.error('Error saving media: ', error);
    });
}

function fetchMediaList() {
    const db = firebase.firestore();
    const mediaListBody = document.getElementById('media_list').getElementsByTagName('tbody')[0];
    mediaListBody.innerHTML = ''; // Clear previous media list

    db.collection('media_uploads').orderBy('timestamp', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const media = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${media.title}</td>
                <td><a href="${media.url}" target="_blank">View Media</a></td>
            `;
            mediaListBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching media list: ', error);
    });
}
