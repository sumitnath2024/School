document.addEventListener('DOMContentLoaded', function() {
  loadUserProfile();

  document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateUserProfile();
  });
});

function loadUserProfile() {
  var user = firebase.auth().currentUser;
  if (user) {
    firebase.firestore().collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          var userData = doc.data();
          document.getElementById('name').value = userData.name || '';
          document.getElementById('address').value = userData.address || '';
          document.getElementById('email').value = userData.email || '';
          document.getElementById('contact_no').value = userData.contact_no || '';
          document.getElementById('dob').value = userData.dob || '';
          document.getElementById('parent_spouse_name').value = userData.parent_spouse_name || '';
          document.getElementById('parent_spouse_contact_no').value = userData.parent_spouse_contact_no || '';
          document.getElementById('role').value = userData.role || '';
          document.getElementById('ward_name').value = userData.ward_name || '';
        }
      })
      .catch((error) => {
        console.error('Error loading user profile:', error);
      });
  } else {
    console.error('No user is signed in.');
  }
}

function updateUserProfile() {
  var user = firebase.auth().currentUser;
  if (user) {
    var userData = {
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      email: document.getElementById('email').value,
      contact_no: document.getElementById('contact_no').value,
      dob: document.getElementById('dob').value,
      parent_spouse_name: document.getElementById('parent_spouse_name').value,
      parent_spouse_contact_no: document.getElementById('parent_spouse_contact_no').value,
      role: document.getElementById('role').value,
      ward_name: document.getElementById('ward_name').value
    };

    firebase.firestore().collection('users').doc(user.uid).update(userData)
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
        alert('Error updating profile');
      });
  } else {
    console.error('No user is signed in.');
  }
}
