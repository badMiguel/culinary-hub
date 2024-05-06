document.addEventListener('DOMContentLoaded', function() {
    const dataUrl = 'recipe_data.json';
    loadRecipeData(dataUrl);
});

function loadRecipeData(url) {
    showLoadingIndicator(true); // Show loading indicator

    fetch(url)
        .then(handleResponse)
        .then(processRecipeData)
        .catch(handleError)
        .finally(() => showLoadingIndicator(false)); // Hide loading indicator when done
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    return response.json();
}

function processRecipeData(data) {
    if (!data.recipes || data.recipes.length === 0) {
        throw new Error('No recipes found in the loaded data');
    }
    const firstRecipe = data.recipes[0];
    updateRecipeDetails(firstRecipe);
}

function updateRecipeDetails(recipe) {
    if (!validateRecipe(recipe)) {
        document.getElementById('recipe-title').textContent = 'Invalid recipe data';
        return;
    }

    updateImage(recipe);
    updateTextDetails(recipe);
    updateIngredientsList(recipe);
    updateNutritionFacts(recipe);
}

function validateRecipe(recipe) {
    return recipe && recipe.recipe_image && recipe.recipe_title && recipe.recipe_description && Array.isArray(recipe.ingredients) && recipe.nutrition_facts;
}

function updateImage(recipe) {
    const imgElement = document.getElementById('recipe-image');
    imgElement.src = recipe.recipe_image;
    imgElement.alt = `Image of ${recipe.recipe_title}`;
}

function updateTextDetails(recipe) {
    document.getElementById('recipe-title').textContent = recipe.recipe_title;
    document.getElementById('recipe-description').textContent = recipe.recipe_description;
}

function updateIngredientsList(recipe) {
    const ingredientsList = document.getElementById('ingredient-list');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.quantity} of ${ingredient.ingredient_name}`;
        ingredientsList.appendChild(li);
    });
}

function updateNutritionFacts(recipe) {
    const tbody = document.getElementById('nutrition-facts').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    Object.entries(recipe.nutrition_facts).forEach(([key, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${key}</td><td>${value}</td>`;
        tbody.appendChild(row);
    });
}

function handleError(error) {
    console.error('Error loading the recipe data:', error);
    document.getElementById('recipe-title').textContent = 'Failed to load data: ' + error.message;
}

function showLoadingIndicator(visible) {
    const loader = document.getElementById('loading-indicator');
    loader.style.display = visible ? 'block' : 'none';
}
