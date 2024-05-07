document.addEventListener('DOMContentLoaded', function() {
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => initRecipes(data))
        .catch(error => console.error('Error loading the recipe data:', error));
});

function initRecipes(recipes) {
    const recipeList = document.getElementById('recipes-container');
    recipes.forEach(recipe => {
        let listItem = document.createElement('li');
        listItem.textContent = recipe.recipe_title;
        listItem.onclick = () => loadRecipeDetails(recipe);
        recipeList.appendChild(listItem);
    });
}

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';

    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
        <h2>${recipe.recipe_title}</h2>
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}">
        <p>${recipe.recipe_description}</p>
        <h4>Allergens: ${recipe.allergens.join(', ')}</h4>
        <h4>Skill Level: ${recipe.cooking_skill_level}</h4>
        <h4>Prep Time: ${recipe.prep_time}</h4>
    `;
    recipesContainer.appendChild(recipeCard);

    const tabs = document.createElement('div');
    tabs.className = 'tabs';
    recipeCard.appendChild(tabs);

    const ingredientsTab = createTabButton('Ingredients', recipe, recipeCard);
    const preparationTab = createTabButton('Preparation', recipe, recipeCard);
    const nutritionTab = createTabButton('Nutrition', recipe, recipeCard);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    toggleTabs(ingredientsTab, recipe); // Default to show ingredients first
}

function createTabButton(tabName, recipe, container) {
    const tabButton = document.createElement('button');
    tabButton.innerText = tabName;
    tabButton.className = 'tab-button';
    tabButton.onclick = () => toggleTabs(tabButton, recipe, container);
    return tabButton;
}

function toggleTabs(selectedTab, recipe, container) {
    const detailContainer = container.querySelector('.detail-container') || document.createElement('div');
    detailContainer.className = 'detail-container';
    detailContainer.innerHTML = '';

    const tabs = container.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');

    switch (selectedTab.innerText) {
        case 'Ingredients':
            showIngredients(recipe, detailContainer);
            break;
        case 'Preparation':
            showPreparation(recipe, detailContainer);
            break;
        case 'Nutrition':
            showNutrition(recipe, detailContainer);
            break;
    }

    if (!container.contains(detailContainer)) {
        container.appendChild(detailContainer);
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
