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

    // Display basic recipe information
    const basicInfo = document.createElement('div');
    basicInfo.innerHTML = `
        <h2>${recipe.recipe_title}</h2>
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}" style="width:100%; height:auto;">
        <p><strong>Description:</strong> ${recipe.recipe_description}</p>
        <p><strong>Cooking Skill Level:</strong> ${recipe.cooking_skill_level}</p>
        <p><strong>Allergens:</strong> ${recipe.allergens.join(', ')}</p>
    `;
    recipesContainer.appendChild(basicInfo);

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
}

function showIngredients(recipe, recipesContainer) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Ingredients</h3><ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>`;
    recipesContainer.appendChild(detailContainer);
}

function showPreparation(recipe, recipesContainer) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Preparation</h3><ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`;
    recipesContainer.appendChild(detailContainer);
}

function showNutrition(recipe, recipesContainer) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = `<h3>Nutrition Facts</h3><ul>${Object.keys(recipe.nutrition_facts).map(key => `<li>${key}: ${recipe.nutrition_facts[key]}</li>`).filter(fact => recipe.nutrition_facts[key] != null).join('')}</ul>`;
    recipesContainer.appendChild(detailContainer);
}
