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
        listItem.className = 'recipe-list-item';  // Apply styling to each list item
        listItem.onclick = () => loadRecipeDetails(recipe);
        recipeList.appendChild(listItem);
    });
}

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous contents

    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const overviewTab = createTabButton('Overview', recipe);
    const ingredientsTab = createTabButton('Ingredients', recipe);
    const preparationTab = createTabButton('Preparation', recipe);
    const nutritionTab = createTabButton('Nutrition', recipe);

    tabs.appendChild(overviewTab);
    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);

    // Initially show the overview tab content
    toggleTabs(overviewTab, recipe);
}

function createTabButton(tabName, recipe) {
    const tabButton = document.createElement('button');
    tabButton.innerText = tabName;
    tabButton.className = 'tab-button'; // Apply CSS for styling buttons
    tabButton.onclick = () => toggleTabs(tabButton, recipe);
    return tabButton;
}

function toggleTabs(selectedTab, recipe) {
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';
    detailContainer.innerHTML = ''; // Clear previous tab content

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active'); // Deactivate all tabs
    });
    selectedTab.classList.add('active'); // Activate the selected tab

    // Show content based on selected tab
    switch (selectedTab.innerText) {
        case 'Overview':
            showOverview(recipe, detailContainer);
            break;
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
    if (!recipesContainer.contains(detailContainer)) {
        recipesContainer.appendChild(detailContainer);
    }
}

function showOverview(recipe, container) {
    container.innerHTML = `
        <h3>Overview</h3>
        <img src="${recipe.image_url}" alt="Image of ${recipe.recipe_title}" style="width:100%;max-width:300px;">
        <p><strong>Description:</strong> ${recipe.description}</p>
        <p><strong>Prep Time:</strong> ${recipe.prep_time}</p>
        <p><strong>Allergens:</strong> ${recipe.allergens.join(', ')}</p>
        <p><strong>Cooking Skill Level:</strong> ${recipe.cooking_skill_level}</p>
    `;
}

function showIngredients(recipe, container) {
    container.innerHTML = `
        <h3>Ingredients</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>
    `;
}

function showPreparation(recipe, container) {
    container.innerHTML = `
        <h3>Preparation</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
    `;
}

function showNutrition(recipe, container) {
    const nutritionFacts = Object.entries(recipe.nutrition_facts).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    container.innerHTML = `
        <h3>Nutrition Facts</h3>
        <ul>${nutritionFacts}</ul>
    `;
}
