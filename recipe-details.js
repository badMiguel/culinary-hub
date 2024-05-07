// Function to fetch recipe data from JSON file
async function fetchRecipes() {
    try {
        const response = await fetch('recipe_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

// Function to populate recipe details with tabbed content
function populateRecipeDetails(recipe) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = ''; // Clear previous content
    createTabs(['Ingredients', 'Instructions'], recipe, container);
}

// Function to display specific content for each tab
function showDetails(tabName, recipe, container) {
    if (tabName === 'Ingredients') {
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.quantity} of ${ingredient.ingredient_name}`;
            ingredientsList.appendChild(listItem);
        });
        container.appendChild(ingredientsList);
    } else if (tabName === 'Instructions') {
        const instructionsList = document.createElement('ol');
        recipe.instructions.forEach(instruction => {
            const listItem = document.createElement('li');
            listItem.textContent = instruction;
            instructionsList.appendChild(listItem);
        });
        container.appendChild(instructionsList);
    }
}

// Ensure you have a div with id 'recipes-container' in your HTML to display the content.
