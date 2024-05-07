// Function to load recipe details and display on webpage
function loadRecipeDetails(recipeId) {
    const recipe = findRecipeById(recipeId);
    const recipesContainer = document.getElementById('recipes-container'); // Changed from 'recipe-details'

    if (recipe && recipesContainer) {
        // Assuming recipe details are displayed in separate elements
        recipesContainer.innerHTML = `
            <div class="recipe">
                <h2>${recipe.name}</h2>
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
                <p>Instructions: ${recipe.instructions}</p>
                <!-- Add more elements for other details as needed -->
            </div>
        `;
    } else {
        console.error('Failed to load recipe data: Recipe not found or recipes container not found');
    }
}
