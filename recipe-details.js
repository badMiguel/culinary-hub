document.addEventListener('DOMContentLoaded', function() {
    // Fetching the JSON data from the server
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => initRecipes(data))
        .catch(error => console.error('Error loading the recipe data:', error));
});

function initRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        let listItem = document.createElement('li');
        listItem.textContent = recipe.recipe_title;
        listItem.onclick = () => loadRecipeDetails(recipe);
        recipeList.appendChild(listItem);
    });
}

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous contents

    // Create a container for tabs
    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const ingredientsTab = document.createElement('button');
    ingredientsTab.innerText = 'Ingredients';
    ingredientsTab.onclick = () => showIngredients(recipe);

    const preparationTab = document.createElement('button');
    preparationTab.innerText = 'Preparation';
    preparationTab.onclick = () => showPreparation(recipe);

    const nutritionTab = document.createElement('button');
    nutritionTab.innerText = 'Nutrition';
    nutritionTab.onclick = () => showNutrition(recipe);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);

    // Initially show ingredients
    showIngredients(recipe);
}

function showIngredients(recipe) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>
    `;
    const recipesContainer = document.getElementById('recipes-container');
    if (!document.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}

function showPreparation(recipe) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `
        <h3>Preparation</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
    const recipesContainer = document.getElementById('recipes-container');
    if (!document.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}

function showNutrition(recipe) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `
        <h3>Nutrition Facts</h3>
        <ul>
            <li>Calories: ${recipe.nutrition_facts.Calories}</li>
            <li>Total Fat: ${recipe.nutrition_facts.TotalFat}</li>
            <li>Protein: ${recipe.nutrition_facts.Protein}</li>
            <!-- More nutrition facts can be added here -->
        </ul>
    `;
    const recipesContainer = document.getElementById('recipes-container');
    if (!document.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}
