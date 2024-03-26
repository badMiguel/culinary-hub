document.addEventListener('DOMContentLoaded', function() {
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
    }); 

    const errorList = ['a valid first name', 'a valid last name', 'a valid email', 'a valid contact number', 'the recipe name', 'the description', 'the cooking time', 'the difficulty', 'the ingredients', 'the instructions'];

    function giveError(nameError, sourceError, nameElement, prevent){
        nameError.textContent = `Please enter ${sourceError}`;
        nameError.style.visibility = 'visible';
        nameElement.classList.add('errorBorder')
        prevent.preventDefault();
    }

    function removeError(nameError, nameElement){
        nameError.style.visibility = 'hidden';
        nameElement.classList.remove('errorBorder')
    }
    
    function stringCheck(string){
        let strCount = 0;
        for (let letter in string){
            strCount +=1;
        }
        return strCount
    }

    function emailFormatCheck(email){
        let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailFormat.test(email);
    }

    function numberFormatCheck(number){
        let numberFormat = /^\d+$/
        return numberFormat.test(number)
    }

    let formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            let inputId = input.getAttribute('id');
            let label = document.querySelector(`label[for="${inputId}"]`);        
            let indicator = label.nextElementSibling

            let elementIdPosition = elementIds.indexOf(inputId)
            let errorIdName = errorIds[elementIdPosition]
            let errorName = error[errorIdName]
            let elementName = elements[inputId]

            if (input.value !== '') {
                indicator.style.visibility = 'hidden';
                removeError(errorName, elementName)
            } else{
                indicator.style.visibility = 'visible';
            }
        });
    });

    elementIds.forEach(function(id){   
        let elementIdPosition = elementIds.indexOf(id)
        let errorIdName = errorIds[elementIdPosition]
        let errorName = error[errorIdName]
        let elementName = elements[id]
        let errorSource = errorList[elementIdPosition]
        let simpleInputs = ['firstName', 'lastName', 'recipeName', 'description', 'difficulty', 'ingredients', 'instructions']

        form.addEventListener('submit', function(prevent){
            if (simpleInputs.includes(id)){
                if (elementName.value =='' || elementName.value==null){
                    giveError(errorName, errorSource, elementName, prevent)
                } else if (stringCheck(elementName.value)==1){
                    giveError(errorName, errorSource, elementName, prevent)
                }
                else {
                    removeError(errorName, elementName)
                };
            } else if (id == "email"){
                if (!emailFormatCheck(elementName.value)){
                    giveError(errorName, errorSource, elementName, prevent)
                } else {
                    removeError(errorName, elementName)
                } 
            } else if (id == 'contactNum'){
                let contactNum = elementName.value.trim();
                if (!numberFormatCheck(contactNum)) {
                    giveError(errorName, errorSource, elementName, prevent);
                } else if (stringCheck(elements.contactNum.value)<6) {
                    giveError(errorName, errorSource, elementName, prevent);
                } else {
                    removeError(errorName, elementName);
                }
            } else if (id == 'cookingTime'){
                if (elementName.value == '00:00'){
                    giveError(errorName, errorSource, elementName, prevent);
                } else{
                    removeError(errorName, elementName);
                }
            }
        });
    });

    form.addEventListener('reset', function(event){
        const confirmed = confirm("Are you sure you want to reset the form?");
        if (!confirmed) {
          event.preventDefault();
        } else{
            elementIds.forEach(function(id){
                let element = elements[id]
                element.classList.remove('errorBorder');
            })
            errorIds.forEach(function(id){
                let errorItsSoHardToName = error[id]
                errorItsSoHardToName.style.visibility = 'hidden' 
            })        
        }
    })
});



