document.addEventListener('DOMContentLoaded', function() {
    // Ensure the path to 'recipe_data.json' is correct relative to the HTML file or server configuration
    fetch('recipe_data.json')
        .then(response => {
            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Ensure the data contains the recipes array and it's not empty
            if (!data.recipes || data.recipes.length === 0) {
                throw new Error('No recipes found in the loaded data');
            }
            // Example to load the first recipe, modify as needed
            const recipeId = 0; 
            const recipe = data.recipes[recipeId];
            updateRecipeDetails(recipe);
        })
        .catch(error => {
            // Log and display errors
            console.error('Error loading the recipe data:', error);
            document.getElementById('recipe-title').textContent = 'Failed to load data: ' + error.message;
        });
});

function updateRecipeDetails(recipe) {
    // Setting the recipe image attributes
    const imgElement = document.getElementById('recipe-image');
    imgElement.src = recipe.recipe_image;
    imgElement.alt = `Image of ${recipe.recipe_title}`;

    // Updating the title and description
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
