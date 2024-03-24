document.addEventListener('DOMContentLoaded', function() {
    var formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var indicator = input.nextElementSibling;
            if (indicator && input.value !== '') {
                indicator.style.display = 'none'; // Hide indicator when input is filled
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        var requiredFields = form.querySelectorAll('input[required]');
        var isValid = true;
        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
        if (!isValid) {
            event.preventDefault(); // Prevent form submission if any required field is empty
        }
    });
});
