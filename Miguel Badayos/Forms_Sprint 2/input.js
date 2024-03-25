document.addEventListener('DOMContentLoaded', function() {
    let formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            let inputId = input.getAttribute('id');
            let label = document.querySelector(`label[for="${inputId}"]`);            
            let indicator = label.nextElementSibling
            if (indicator && input.value !== '') {
                indicator.style.visibility = 'hidden'; // Hide indicator when input is filled
            } else{
                indicator.style.visibility = 'visible';
            }
        });
    });
});



