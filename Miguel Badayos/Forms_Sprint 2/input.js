document.addEventListener('DOMContentLoaded', function() {
    let formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            let inputId = input.getAttribute('id');
            let label = document.querySelector(`label[for="${inputId}"]`);            
            let indicator = label.nextElementSibling
            if (input.value !== '') {
                indicator.style.visibility = 'hidden';
            } else{
                indicator.style.visibility = 'visible';
            }
        });
    });
    const form = document.getElementById("form")
    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const email = document.getElementById("email")
    const contactNum = document.getElementById("contactNum")
    const recipeName = document.getElementById("recipeName")
    const description = document.getElementById("description")
    const cookingTime = document.getElementById("cookingTime")
    const difficulty = document.getElementById("difficulty")
    const ingredients = document.getElementById("ingredients")
    const instructions = document.getElementById("instructions")
    form.addEventListener('submit', function(prevent){
        let errorFname=[]
        if (firstName.value =='' || firstName.value==null){
            
        };
        if (errorMessage.length> 0){
            prevent.preventDefault()
        };
    })
});



