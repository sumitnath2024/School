document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchBookList();
});

function addBook() {
    const bookTitle = document.getElementById('book_title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (bookTitle === '' || author === '' || isbn === '') {
        alert('Please fill in all fields.');
        return;
    }

    const db = firebase.firestore();

    db.collection('library_catalog').add({
        title: bookTitle,
        author: author,
        isbn: isbn,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Book added successfully.');
        fetchBookList();
    })
    .catch((error) => {
        console.error('Error adding book: ', error);
    });
}

function fetchBookList() {
    const db = firebase.firestore();
    const bookListBody = document.getElementById('book_list').getElementsByTagName('tbody')[0];
    bookListBody.innerHTML = ''; // Clear previous book list

    db.collection('library_catalog').orderBy('timestamp', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const book = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
            `;
            bookListBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching book list: ', error);
    });
}
