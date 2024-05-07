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
        listItem.className = 'recipe-list-item';
        listItem.onclick = () => loadRecipeDetails(recipe);
        recipeList.appendChild(listItem);
    });
}

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous contents

    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const ingredientsTab = createTabButton('Ingredients', recipe);
    const preparationTab = createTabButton('Preparation', recipe);
    const nutritionTab = createTabButton('Nutrition', recipe);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);

    // Show the first tab's content by default (ingredients here)
    toggleTabs(ingredientsTab, recipe);
}

function createTabButton(tabName, recipe) {
    const tabButton = document.createElement('button');
    tabButton.innerText = tabName;
    tabButton.className = 'tab-button';
    tabButton.onclick = () => toggleTabs(tabButton, recipe);
    return tabButton;
}

function toggleTabs(selectedTab, recipe) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = showOverview(recipe); // Always show overview

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');

    switch (selectedTab.innerText) {
        case 'Ingredients':
            detailContainer.innerHTML += showIngredients(recipe);
            break;
        case 'Preparation':
            detailContainer.innerHTML += showPreparation(recipe);
            break;
        case 'Nutrition':
            detailContainer.innerHTML += showNutrition(recipe);
            break;
    }

    const recipesContainer = document.getElementById('recipes-container');
    if (!recipesContainer.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}

function showOverview(recipe) {
    return `
        <div class="overview">
            <h3>Overview</h3>
            <img src="${recipe_image}" alt="Image of ${recipe_title}" style="width:100%;max-width:300px;">
            <p><strong>Description:</strong> ${recipe_description}</p>
            <p><strong>Prep Time:</strong> ${recipe.prep_time}</p>
            <p><strong>Allergens:</strong> ${recipe.allergens.join(', ')}</p>
            <p><strong>Cooking Skill Level:</strong> ${recipe.cooking_skill_level}</p>
        </div>
    `;
}

function showIngredients(recipe) {
    return `
        <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>
        </div>
    `;
}

function showPreparation(recipe) {
    return `
        <div class="preparation">
            <h3>Preparation</h3>
            <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
        </div>
    `;
}

function showNutrition(recipe) {
    const nutritionFacts = Object.entries(recipe.nutrition_facts).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    return `
        <div class="nutrition">
            <h3>Nutrition Facts</h3>
            <ul>${nutritionFacts}</ul>
        </div>
    `;
}
