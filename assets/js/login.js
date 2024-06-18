// assets/js/login.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert('Login successful');
      // Redirect to dashboard based on user role
      // Replace with actual role-based redirection logic
      window.location.href = "Admin Mgmt.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error: ' + errorMessage);
    });
});
