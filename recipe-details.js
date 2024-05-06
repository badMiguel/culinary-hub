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
        listItem.data = recipe; // Store recipe data in the element
        recipeList.appendChild(listItem);
    });

    // Use event delegation for handling clicks on recipe items
    recipeList.addEventListener('click', function(event) {
        const listItem = event.target;
        if (listItem.tagName === 'LI') {
            loadRecipeDetails(listItem.data);
        }
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

    createTabs(['Ingredients', 'Preparation', 'Nutrition'], recipe, recipesContainer);
}

function createTabs(tabNames, recipe, container) {
    const tabs = document.createElement('div');
    tabs.className = 'tabs';

    tabNames.forEach(tabName => {
        const tabButton = document.createElement('button');
        tabButton.innerText = tabName;
        tabButton.addEventListener('click', () => showDetails(tabName.toLowerCase(), recipe, container));
        tabs.appendChild(tabButton);
    });

    container.appendChild(tabs);
}

function showDetails(type, recipe, recipesContainer) {
    let content = '';
    const detailContainer = document.getElementById('detail-container') || document.createElement('div');
    detailContainer.id = 'detail-container';

    switch (type) {
        case 'ingredients':
            content = `<h3>Ingredients</h3><ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient_name}: ${ingredient.quantity}</li>`).join('')}</ul>`;
            break;
        case 'preparation':
            content = `<h3>Preparation</h3><ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>`;
            break;
        case 'nutrition':
            content = `<h3>Nutrition Facts</h3><ul>${Object.keys(recipe.nutrition_facts).map(key => {
                if (recipe.nutrition_facts[key] != null) {
                    return `<li>${key}: ${recipe.nutrition_facts[key]}</li>`;
                }
                return '';
            }).join('')}</ul>`;
            break;
    }

    detailContainer.innerHTML = content;
    recipesContainer.appendChild(detailContainer);
}
