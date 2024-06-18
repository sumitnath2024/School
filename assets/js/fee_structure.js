document.addEventListener('DOMContentLoaded', function() {
    fetchClasses();
    fetchFeeList();
});

function fetchClasses() {
    const db = firebase.firestore();
    db.collection('classes').get().then((querySnapshot) => {
        const classSelect = document.getElementById('class');
        classSelect.innerHTML = '<option value="">Select Class</option>'; // Clear previous classes
        querySnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id;
            option.text = doc.data().name;
            classSelect.add(option);
        });
    });
}

function fetchFeeList() {
    const db = firebase.firestore();
    db.collection('fee_structure').get().then((querySnapshot) => {
        const feeList = document.getElementById('fee_list');
        feeList.innerHTML = ''; // Clear previous fee list
        querySnapshot.forEach((doc) => {
            const fee = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<strong>${fee.class_name} - ${fee.fee_type}:</strong> ${fee.amount}`;
            feeList.appendChild(li);
        });
    });
}

function addFeeStructure() {
    const className = document.getElementById('class').value;
    const feeType = document.getElementById('fee_type').value;
    const amount = document.getElementById('amount').value;

    if (className === '' || feeType === '' || amount === '') {
        alert('Please fill all the required fields.');
        return;
    }

    const db = firebase.firestore();
    db.collection('classes').doc(className).get().then((doc) => {
        if (doc.exists) {
            const classData = doc.data();
            db.collection('fee_structure').add({
                class_id: className,
                class_name: classData.name,
                fee_type: feeType,
                amount: parseFloat(amount),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                document.getElementById('feeStructureForm').reset();
                fetchFeeList();
                alert('Fee structure added successfully.');
            }).catch((error) => {
                console.error('Error adding fee structure:', error);
            });
        } else {
            alert('Class not found.');
        }
    }).catch((error) => {
        console.error('Error fetching class:', error);
    });
}
