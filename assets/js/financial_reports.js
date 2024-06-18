document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();
});

function generateFinancialReport() {
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    if (startDate === '' || endDate === '') {
        alert('Please select both start and end dates.');
        return;
    }

    const db = firebase.firestore();
    const reportTableBody = document.getElementById('report_table').getElementsByTagName('tbody')[0];
    reportTableBody.innerHTML = ''; // Clear previous report data

    db.collection('fee_structure')
        .where('timestamp', '>=', new Date(startDate))
        .where('timestamp', '<=', new Date(endDate))
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const fee = doc.data();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${fee.timestamp.toDate().toLocaleDateString()}</td>
                    <td>${fee.class_name}</td>
                    <td>${fee.fee_type}</td>
                    <td>${fee.amount}</td>
                `;
                reportTableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error generating report:', error);
        });
}
