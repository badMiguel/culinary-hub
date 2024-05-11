document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('recipeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate dietary preferences
        var dietaryPreferences = document.getElementsByName('dietaryPreferences');
        var dietarySelected = false;
        for (var i = 0; i < dietaryPreferences.length; i++) {
            if (dietaryPreferences[i].checked) {
                dietarySelected = true;
                break;
            }
        }
        if (!dietarySelected) {
            document.getElementById('dietaryError').innerText = 'Select at least one option';
        } else {
            document.getElementById('dietaryError').innerText = '';
        }

        // Validate cooking skill
        var cookingSkill = document.getElementsByName('cookingSkill');
        var skillSelected = false;
        for (var i = 0; i < cookingSkill.length; i++) {
            if (cookingSkill[i].checked) {
                skillSelected = true;
                break;
            }
        }
        if (!skillSelected) {
            document.getElementById('cookingError').innerText = 'Select one option';
        } else {
            document.getElementById('cookingError').innerText = '';
        }

        // Validate meal preference
        var mealPreference = document.getElementById('mealPreference').value;
        if (mealPreference === '') {
            document.getElementById('mealError').innerText = 'Select one option';
        } else {
            document.getElementById('mealError').innerText = '';
        }

        // Validate preparation time
        var preparationTime = document.getElementById('preparationTime').value;
        if (preparationTime === '') {
            document.getElementById('preparationError').innerText = 'Select one option';
        } else {
            document.getElementById('preparationError').innerText = '';
        }

        // Proceed if all fields are filled
        if (dietarySelected && skillSelected && mealPreference !== '' && preparationTime !== '') {
            document.getElementById('recipeForm').reset();

            alert('Recipe submitted successfully!');
        }
    });
});
