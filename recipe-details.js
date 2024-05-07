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

    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    const ingredientsTab = createTabButton('Ingredients', recipe);
    const preparationTab = createTabButton('Preparation', recipe);
    const nutritionTab = createTabButton('Nutrition', recipe);

    tabs.appendChild(ingredientsTab);
    tabs.appendChild(preparationTab);
    tabs.appendChild(nutritionTab);

    recipesContainer.appendChild(tabs);

    // Initially show ingredients
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
    detailContainer.innerHTML = ''; // Clear previous tab content

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.classList.remove('active'); // Remove active class from all tabs
    });
    selectedTab.classList.add('active'); // Add active class to the selected tab

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
    container.innerHTML = `
        <h3>Nutrition Facts</h3>
        <ul>
            <li>Calories: ${recipe.nutrition_facts.Calories}</li>
            <li>Total Fat: ${recipe.nutrition_facts.TotalFat}</li>
            <li>Protein: ${recipe.nutrition_facts.Protein}</li>
            <!-- More nutrition facts can be added here -->
        </ul>
    `;
}
