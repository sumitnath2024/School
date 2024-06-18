document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchInventoryList();
});

function addItem() {
    const itemName = document.getElementById('item_name').value;
    const quantity = document.getElementById('quantity').value;

    if (!itemName || !quantity) {
        alert('Please provide item name and quantity.');
        return;
    }

    const db = firebase.firestore();
    db.collection('inventory').add({
        name: itemName,
        quantity: parseInt(quantity),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Item added successfully.');
        fetchInventoryList();
    })
    .catch((error) => {
        console.error('Error adding item: ', error);
    });
}

function fetchInventoryList() {
    const db = firebase.firestore();
    const inventoryListBody = document.getElementById('inventory_list').getElementsByTagName('tbody')[0];
    inventoryListBody.innerHTML = ''; // Clear previous inventory list

    db.collection('inventory').orderBy('timestamp', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
            `;
            inventoryListBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching inventory list: ', error);
    });
}
