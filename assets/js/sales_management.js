document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
    fetchItemList();
    fetchSalesList();
});

function sellItem() {
    const itemName = document.getElementById('item_name').value;
    const quantity = document.getElementById('quantity').value;
    const customerId = document.getElementById('customer_id').value;

    if (!itemName || !quantity || !customerId) {
        alert('Please provide all necessary details.');
        return;
    }

    const db = firebase.firestore();
    db.collection('sales').add({
        item_name: itemName,
        quantity: parseInt(quantity),
        customer_id: customerId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Item sold successfully.');
        fetchSalesList();
    })
    .catch((error) => {
        console.error('Error selling item: ', error);
    });
}

function fetchItemList() {
    const db = firebase.firestore();
    const itemSelect = document.getElementById('item_name');
    itemSelect.innerHTML = ''; // Clear previous item list

    db.collection('inventory').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            itemSelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching item list: ', error);
    });
}

function fetchSalesList() {
    const db = firebase.firestore();
    const salesListBody = document.getElementById('sales_list').getElementsByTagName('tbody')[0];
    salesListBody.innerHTML = ''; // Clear previous sales list

    db.collection('sales').orderBy('timestamp', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const sale = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.item_name}</td>
                <td>${sale.quantity}</td>
                <td>${sale.customer_id}</td>
                <td>${new Date(sale.timestamp.seconds * 1000).toLocaleString()}</td>
            `;
            salesListBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error('Error fetching sales list: ', error);
    });
}
