document.addEventListener('DOMContentLoaded', function() {
    // Auto-fill the name field
    var name = document.getElementById('name');
    name.value = ''; // Set name field to empty

    // Auto-fill the email field
    var email = document.getElementById('email');
    email.value = 'example@example.com'; // Auto-fill email field with a predefined email

    // Auto-fill the message field
    var message = document.getElementById('message');
    message.value = 'Type your message here'; // Auto-fill message field with a predefined message

    // Add event listener to the form for validation
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        // Get form fields
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        // Validate email
        if (email.value.trim() === '') {
            alert('Please enter your email.');
            email.focus();
            event.preventDefault();
            return false;
        } else if (!isValidEmail(email.value)) {
            alert('Please enter a valid email address.');
            email.focus();
            event.preventDefault();
            return false;
        }

        // Validate message
        if (message.value.trim() === '') {
            alert('Please enter your message.');
            message.focus();
            event.preventDefault();
            return false;
        }

        return true;
    });
});

// Function to validate email format
function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
