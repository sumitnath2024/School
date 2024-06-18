document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchCategoryList();
});

function addCategory() {
    const categoryName = document.getElementById('category_name').value;

    if (!categoryName) {
        alert('Please provide a category name.');
        return;
    }

    const db = firebase.firestore();
    db.collection('media_categories').add({
        name: categoryName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Category added successfully.');
        fetchCategoryList();
    })
    .catch((error) => {
        console.error('Error adding category: ', error);
    });
}

function fetchCategoryList() {
    const db = firebase.firestore();
    const categoryListBody = document.getElementById('category_list').getElementsByTagName('tbody')[0];
    categoryListBody.innerHTML = ''; // Clear previous category list

    db.collection('media_categories').orderBy('timestamp', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.name}</td>
            `;
            categoryListBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching category list: ', error);
    });
}
