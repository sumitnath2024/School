document.addEventListener('DOMContentLoaded', function() {
    fetchReportCards();
});

function fetchReportCards() {
    const db = firebase.firestore();
    db.collection('report_cards').where('approved', '==', false).get().then((querySnapshot) => {
        const reportCardList = document.getElementById('report_card_list');
        reportCardList.innerHTML = ''; // Clear previous list
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <input type="checkbox" class="form-check-input" id="${doc.id}">
                <label class="form-check-label" for="${doc.id}">${record.student_name} - ${record.class_name} - ${record.section_name} - ${record.subject} - ${record.marks} - ${record.grade}</label>
            `;
            reportCardList.appendChild(li);
        });
    }).catch((error) => {
        console.error('Error fetching report cards:', error);
    });
}

function approveReportCards() {
    const db = firebase.firestore();
    const checkboxes = document.querySelectorAll('#report_card_list .form-check-input:checked');

    checkboxes.forEach((checkbox) => {
        const reportCardId = checkbox.id;
        db.collection('report_cards').doc(reportCardId).update({
            approved: true
        }).then(() => {
            fetchReportCards();
        }).catch((error) => {
            console.error('Error approving report card:', error);
        });
    });
}
