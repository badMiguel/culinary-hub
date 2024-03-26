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
    const elementIds = ["email", "contactNum", "cookingTime", "difficulty"];
    const elements = {};
    elementIds.forEach(function(id) {
        elements[id] = document.getElementById(id);
    });

    const elementIdsForLoopedFunction = ["firstName", "lastName", "recipeName", "description", "ingredients", "instructions"];
    const elementsForLoopedFunction = {};
    elementIdsForLoopedFunction.forEach(function(id) {
        elementsForLoopedFunction[id] = document.getElementById(id);
    });    

    const errorIds = ["errorEmail", "errorContact", "errorTime", "errorDifficulty"];
    const error = {};
    errorIds.forEach(function(id){
        error[id] = document.getElementById(id)
    }); 

    const errorIdsForLoopedFunction = ["errorFname", "errorLname", "errorRecipeName", "errorDescription", "errorIngredients", "errorInstructions"];
    const errorForLoopedFunction = {};
    errorIdsForLoopedFunction.forEach(function(id){
        errorForLoopedFunction[id] = document.getElementById(id)
    });

    const errorList = ['a valid first name', 'a valid last name', 'the recipe name', 'the description', 'the ingredients', 'the instructions'];
    elementIdsForLoopedFunction.forEach(function(id){
        
        const elementIdPosition = elementIdsForLoopedFunction.indexOf(id)
        const errorIdName = errorIdsForLoopedFunction[elementIdPosition]
        const errorName = errorForLoopedFunction[errorIdName]
        let elementName = elementsForLoopedFunction[id]
        let errorSource = errorList[elementIdPosition]

        form.addEventListener('submit', function(prevent){
            if (elementName.value =='' || elementName.value==null){
                errorName.textContent = `Please enter ${errorSource}`;
                errorName.style.visibility = 'visible';
                elementName.classList.add('errorBorder')
                prevent.preventDefault();
            } else if (stringCheck(elementName.value)==1){
                errorName.textContent = `Please type ${errorSource}`;
                errorName.style.visibility = 'visible';
                elementName.classList.add('errorBorder')
                prevent.preventDefault();
            }
            else {
                errorName.style.visibility = 'hidden';
                elementName.classList.remove('errorBorder')
            };
        });
    });
    
    function stringCheck(string){
        let strCount = 0;
        for (let letter in string){
            strCount +=1;
        }
        return strCount
    }

    function eFormatCheck(email){
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailFormat.test(email);
    }

    function emailCheck(prevent){
        if (!eFormatCheck(elements.email.value)){
            error.errorEmail.textContent = 'Please enter a valid email';
            error.errorEmail.style.visibility = 'visible';
            elements.email.classList.add('errorBorder')
            prevent.preventDefault();
        } else {
            error.errorEmail.style.visibility = 'hidden';
            elements.email.classList.remove('errorBorder')
        }  
    }

    function contactCheck(prevent) {

        let contactNum = elements.contactNum.value.trim();
        
        if (!/^\d+$/.test(contactNum)) {
            error.errorContact.textContent = 'Please enter a valid contact number';
            error.errorContact.style.visibility = 'visible';
            elements.contactNum.classList.add('errorBorder');
            prevent.preventDefault();
        } else if (stringCheck(elements.contactNum.value)<6) {
            error.errorContact.textContent = 'Please enter a valid contact number';
            error.errorContact.style.visibility = 'visible';
            elements.contactNum.classList.add('errorBorder');
            prevent.preventDefault();
        } else {
            error.errorContact.style.visibility = 'hidden';
            elements.contactNum.classList.remove('errorBorder');
        }  
    }
    function timeCheck(prevent){

    }
    function difficultyCheck(prevent){

    }
    form.addEventListener('submit', emailCheck)
    form.addEventListener('submit', contactCheck)
    form.addEventListener('submit', timeCheck)
    form.addEventListener('submit', difficultyCheck)
});



