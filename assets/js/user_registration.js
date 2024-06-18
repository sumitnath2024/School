document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm_password').value;
  var role = document.getElementById('role').value;

  if (!validateRegistrationForm(password, confirmPassword)) {
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      return firebase.firestore().collection('users').doc(user.uid).set({
        username: username,
        email: email,
        role: role
      });
    })
    .then(() => {
      alert('Registration successful');
      window.location.href = "../login.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error: ' + errorMessage);
    });
});

function validateRegistrationForm(password, confirmPassword) {
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return false;
  }
  return true;
}
