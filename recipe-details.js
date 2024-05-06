document.addEventListener('DOMContentLoaded', function() {
    // Fetching the recipe data from a JSON file hosted in the same directory
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            // Example: Load a recipe by its position in the array or other logic
            const recipeId = 0; // Loading the first recipe as an example
            const recipe = data.recipes[recipeId];

            // Updating the DOM elements with the fetched recipe details
            updateRecipeDetails(recipe);
        })
        .catch(error => {
            console.error('Error loading the recipe data:', error);
            document.getElementById('recipe-title').textContent = 'Failed to load data';
        });
});

function updateRecipeDetails(recipe) {
    // Setting the recipe image attributes
    const imgElement = document.getElementById('recipe-image');
    imgElement.src = recipe.recipe_image;
    imgElement.alt = `Image of ${recipe.recipe_title}`;

    // Setting the title and description
    document.getElementById('recipe-title').textContent = recipe.recipe_title;
    document.getElementById('recipe-description').textContent = recipe.recipe_description;

    // Populating the ingredients list
    const ingredientsList = document.getElementById('ingredient-list');
    ingredientsList.innerHTML = ''; // Clear existing list items
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.quantity} of ${ingredient.ingredient_name}`;
        ingredientsList.appendChild(li);
    });

    // Populating the nutrition facts table
    const nutritionFactsTable = document.getElementById('nutrition-facts').getElementsByTagName('tbody')[0];
    nutritionFactsTable.innerHTML = ''; // Clear existing table rows
    Object.entries(recipe.nutrition_facts).forEach(([key, value]) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${key}</td><td>${value}</td>`;
        nutritionFactsTable.appendChild(row);
    });
}
