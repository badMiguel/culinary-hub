document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r.id === parseInt(recipeId));
            if (recipe) {
                displayRecipeDetails(recipe);
            } else {
                console.error('Recipe not found');
            }
        })
        .catch(error => {
            console.error('Error loading the recipe data:', error);
            setTimeout(() => {
                // Retry fetch after a delay
                window.location.reload();
            }, 5000); // retry after 5 seconds
        });
});

function displayRecipeDetails(recipe) {
    const image = document.getElementById('recipe-image');
    const title = document.getElementById('recipe-title');
    const description = document.getElementById('recipe-description');
    const prepTime = document.getElementById('prep-time');
    const allergens = document.getElementById('allergens');
    const skillLevel = document.getElementById('cooking-skill-level');

    image.src = recipe.recipe_image;
    image.alt = 'Image of ' + recipe.recipe_title;
    title.textContent = recipe.recipe_title;
    description.textContent = recipe.recipe_description;
    prepTime.textContent = recipe.prep_time;
    allergens.textContent = recipe.allergens.join(', ');
    skillLevel.textContent = recipe.cooking_skill_level;

    setupTabs(recipe);
}

function setupTabs(recipe) {
    const tabContent = document.getElementById('tab-content');
    document.querySelectorAll('.tab-button').forEach(button => {
        button.onclick = () => showTabContent(button.textContent.toLowerCase(), recipe, tabContent);
    });
}

function showTabContent(tabName, recipe, container) {
    switch (tabName) {
        case 'ingredients':
            showIngredients(recipe, container);
            break;
        case 'preparation':
            showPreparation(recipe, container);
            break;
        case 'nutrition':
            showNutrition(recipe, container);
            break;
    }
}

function showIngredients(recipe, container) {
    container.innerHTML = `<h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>`;
}

function showPreparation(recipe, container) {
    container.innerHTML = `<h3>Preparation</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`;
}

function showNutrition(recipe, container) {
    let nutritionHTML = '<h3>Nutrition Facts</h3><ul>';
    Object.keys(recipe.nutrition_facts).forEach(key => {
        nutritionHTML += `<li>${key}: ${recipe.nutrition_facts[key]}</li>`;
    });
    nutritionHTML += '</ul>';
    container.innerHTML = nutritionHTML;
}
