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

    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const ingredientsTab = createTabButton('Ingredients', recipe);
    const preparationTab = createTabButton('Preparation', recipe);
    const nutritionTab = createTabButton('Nutrition', recipe);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);
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
    detailContainer.innerHTML = '';

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
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

    const recipesContainer = document.getElementById('recipes-container');
    if (!document.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}

function showIngredients(recipe, container) {
    container.innerHTML = `
        <h2>${recipe.recipe_title}</h2>
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}">
        <p>${recipe.recipe_description}</p>
        <p>Allergens: ${recipe.allergens.join(', ')}</p>
        <p>Skill Level: ${recipe.cooking_skill_level}</p>
        <p>Prep Time: ${recipe.prep_time}</p>
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>
    `;
}

function showPreparation(recipe, container) {
    container.innerHTML = `
        <h2>${recipe.recipe_title}</h2>
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}">
        <p>${recipe.recipe_description}</p>
        <p>Allergens: ${recipe.allergens.join(', ')}</p>
        <p>Skill Level: ${recipe.cooking_skill_level}</p>
        <p>Prep Time: ${recipe.prep_time}</p>
        <h3>Preparation</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
}

function showNutrition(recipe, container) {
    let nutritionHTML = '<ul>';
    Object.keys(recipe.nutrition_facts).forEach(key => {
        nutritionHTML += `<li>${key}: ${recipe.nutrition_facts[key]}</li>`;
    });
    nutritionHTML += '</ul>';

    container.innerHTML = `
        <h2>${recipe.recipe_title}</h2>
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}">
        <p>${recipe.recipe_description}</p>
        <p>Allergens: ${recipe.allergens.join(', ')}</p>
        <p>Skill Level: ${recipe.cooking_skill_level}</p>
        <p>Prep Time: ${recipe.prep_time}</p>
        <h3>Nutrition Facts</h3>
        ${nutritionHTML}
    `;
}
