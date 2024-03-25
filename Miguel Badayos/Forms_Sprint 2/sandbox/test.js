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

