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
    const form = document.getElementById('form')
    const elementIds = ["firstName", "lastName", "email", "contactNum", "recipeName", "description", "cookingTime", "difficulty", "ingredients", "instructions"];
    const elements = {};
    elementIds.forEach(function(id) {
        elements[id] = document.getElementById(id);
    });
    const errorIds = ["errorFname", "errorLname", "errorEmail", "errorContact", "errorRecipeName", "errorDescription", "errorTime", "errorDifficulty", "errorIngredients", "errorInstructions"];
    const error = {};
    errorIds.forEach(function(id){
        error[id] = document.getElementById(id)
    }) 
    function stringCheck(string){
        let strCount = 0;
        for (let letter in string){
            strCount +=1;
        }
        return strCount
    }
    function firstNameCheck(prevent){
        if (elements.firstName.value =='' || elements.firstName.value==null){
            error.errorFname.textContent = 'Please enter your first name';
            error.errorFname.style.visibility = 'visible';
            elements.firstName.classList.add('errorBorder')
            prevent.preventDefault();
        } else if (stringCheck(elements.firstName.value)==1){
            error.errorFname.textContent = 'Please type a valid name';
            error.errorFname.style.visibility = 'visible';
            elements.firstName.classList.add('errorBorder')
            prevent.preventDefault();
        }
        else {
            error.errorFname.style.visibility = 'hidden';
            elements.firstName.classList.remove('errorBorder')
        }
    }
    form.addEventListener('submit', firstNameCheck)
});



