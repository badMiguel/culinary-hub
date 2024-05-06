document.addEventListener('DOMContentLoaded', async function() {
    try {
        const recipes = await fetch('recipe_data.json').then(response => response.json());
        initRecipes(recipes);
    } catch (error) {
        console.error('Error loading the recipe data:', error);
    }
});

function initRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        let listItem = document.createElement('li');
        listItem.textContent = recipe.recipe_title;
        listItem.addEventListener('click', () => loadRecipeDetails(recipe));
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
    ingredientsTab.addEventListener('click', () => showIngredients(recipe, recipesContainer));

    const preparationTab = document.createElement('button');
    preparationTab.innerText = 'Preparation';
    preparationTab.addEventListener('click', () => showPreparation(recipe, recipesContainer));

    const nutritionTab = document.createElement('button');
    nutritionTab.innerText = 'Nutrition';
    nutritionTab.addEventListener('click', () => showNutrition(recipe, recipesContainer));

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);

    // Initially show ingredients
    showIngredients(recipe, recipesContainer);
}

function showIngredients(recipe, recipesContainer) {
    const detailContainer = document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Ingredients</h3><ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>`;
    recipesContainer.appendChild(detailContainer);
}

function showPreparation(recipe, recipesContainer) {
    const detailContainer = document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Preparation</h3><ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`;
    recipesContainer.appendChild(detailContainer);
}

function showNutrition(recipe, recipesContainer) {
    const detailContainer = document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Nutrition Facts</h3><ul>${Object.keys(recipe.nutrition_facts).map(key => `<li>${key}: ${recipe.nutrition_facts[key]}</li>`).filter(fact => fact !== "null").join('')}</ul>`;
    recipesContainer.appendChild(detailContainer);
}
