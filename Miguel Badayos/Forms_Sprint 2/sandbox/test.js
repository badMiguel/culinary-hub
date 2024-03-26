document.getElementById('myForm').addEventListener('submit', function(event) {
    var usernameInput = document.getElementById('username');
    if (!usernameInput.value) {
        // If the username field is empty, prevent form submission
        event.preventDefault();
        // Show custom error message
        document.getElementById('error-message').innerText = 'Please enter a username.';
        document.getElementById('error-message').style.display = 'block';
    } else {
        // Hide error message if username is provided
        document.getElementById('error-message').style.display = 'none';
    }
});
