document.addEventListener('DOMContentLoaded', async function() {
    try {
        const recipeData = await loadRecipeData();
        if (recipeData.length > 0) {
            initRecipes(recipeData);
        }
    } catch (error) {
        console.error('Error loading the recipe data:', error);
        setTimeout(() => {
            window.location.reload(); // Retry loading data after a delay
        }, 5000);
    }
});

async function loadRecipeData() {
    const response = await fetch('recipe_data.json');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
}

// 
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('id');

    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r.id === parseInt(recipeId));
            if (recipe) {
                displayRecipeDetails(recipe);
            } else {
                console.error('Recipe not found');
            }
        })
        .catch(error => {
            console.error('Error loading the recipe data:', error);
            setTimeout(() => {
                // Retry fetch after a delay
                window.location.reload();
            }, 5000); // retry after 5 seconds
        });
})

function loadRecipeDetails(recipe) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Clear previous content

    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';
    recipeCard.innerHTML = `
        <img src="${recipe.recipe_image}" alt="Image of ${recipe.recipe_title}" class="recipe-image" loading="lazy">
        <h2>${recipe.recipe_title}</h2>
        <p>${recipe.recipe_description}</p>
        <div class="recipe-details">
            <span><strong>Prep Time:</strong> ${recipe.prep_time}</span>
            <span><strong>Allergens:</strong> ${recipe.allergens.join(', ')}</span>
            <span><strong>Skill Level:</strong> ${recipe.cooking_skill_level}</span>
        </div>
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

    toggleTabs(ingredientsTab, recipe, recipeCard); // Default to show ingredients first
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
    container.appendChild(detailContainer); // Ensure the container is appended only once

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
