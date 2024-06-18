document.addEventListener('DOMContentLoaded', function() {
  const studentIdInput = document.getElementById('studentId');
  const certificateTypeInput = document.getElementById('certificateType');
  const issueDateInput = document.getElementById('issueDate');
  const fetchCertificateListBtn = document.getElementById('fetchCertificateListBtn');
  const issueCertificateBtn = document.getElementById('issueCertificateBtn');
  const certificateList = document.getElementById('certificateList');

  // Function to fetch certificate list
  function fetchCertificateList() {
    // Fetch data from the database (replace with actual database call)
    const certificates = [
      { certificate_id: 'BC1', student_id: 'S1', certificate_type: 'Merit', issue_date: '2024-06-15' },
      { certificate_id: 'BC2', student_id: 'S2', certificate_type: 'Participation', issue_date: '2024-06-15' }
    ];

    certificateList.innerHTML = '';
    certificates.forEach(certificate => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `Certificate ${certificate.certificate_id}: Student ${certificate.student_id} - ${certificate.certificate_type} on ${certificate.issue_date}`;
      certificateList.appendChild(listItem);
    });
  }

  // Function to issue a new certificate
  function issueCertificate() {
    const studentId = studentIdInput.value;
    const certificateType = certificateTypeInput.value;
    const issueDate = issueDateInput.value;

    if (studentId && certificateType && issueDate) {
      // Add new certificate to the database (replace with actual database call)
      console.log('Certificate Issued:', { certificate_id: `BC${Math.floor(Math.random() * 1000)}`, student_id: studentId, certificate_type: certificateType, issue_date: issueDate });

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
  issueCertificateBtn.addEventListener('click', issueCertificate);

  // Fetch initial certificate list
  fetchCertificateList();
});
