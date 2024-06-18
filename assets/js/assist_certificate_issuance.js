document.addEventListener('DOMContentLoaded', function() {
  const studentIdInput = document.getElementById('studentId');
  const certificateTypeInput = document.getElementById('certificateType');
  const issueDateInput = document.getElementById('issueDate');
  const fetchCertificateListBtn = document.getElementById('fetchCertificateListBtn');
  const assistCertificateIssuanceBtn = document.getElementById('assistCertificateIssuanceBtn');
  const certificateList = document.getElementById('certificateList');

  // Function to fetch certificate list
  function fetchCertificateList() {
    // Fetch data from the database (replace with actual database call)
    const certificates = [
      { student_id: 'S1', certificate_type: 'Merit', issue_date: '2024-06-15' },
      { student_id: 'S2', certificate_type: 'Participation', issue_date: '2024-06-15' }
    ];

    certificateList.innerHTML = '';
    certificates.forEach(certificate => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Student ${certificate.student_id}: ${certificate.certificate_type} on ${certificate.issue_date}`;
      certificateList.appendChild(listItem);
    });
  }

  // Function to assist certificate issuance
  function assistCertificateIssuance() {
    const studentId = studentIdInput.value;
    const certificateType = certificateTypeInput.value;
    const issueDate = issueDateInput.value;

    if (studentId && certificateType && issueDate) {
      // Add new certificate to the database (replace with actual database call)
      console.log('Certificate Issued:', { student_id: studentId, certificate_type: certificateType, issue_date: issueDate });

      // Clear form fields
      studentIdInput.value = '';
      certificateTypeInput.value = '';
      issueDateInput.value = '';

      // Fetch updated certificate list
      fetchCertificateList();
    } else {
      alert('Please fill all fields');
    }
  }

  // Event listeners
  fetchCertificateListBtn.addEventListener('click', fetchCertificateList);
  assistCertificateIssuanceBtn.addEventListener('click', assistCertificateIssuance);

  // Fetch initial certificate list
  fetchCertificateList();
});
