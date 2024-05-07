// Function to fetch recipe data from JSON file
async function fetchRecipes() {
    document.getElementById('loading-indicator').style.display = 'block'; // Show loading indicator
    try {
        const response = await fetch('recipe_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    } finally {
        document.getElementById('loading-indicator').style.display = 'none'; // Hide loading indicator
    }
}

// Function to populate recipe cards dynamically
function populateRecipeCards(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = ''; // Clear previous content

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
            </div>
            <div class="card-content">
                <h3>${recipe.recipe_title}</h3>
                <p>${recipe.recipe_description}</p>
                <button onclick="populateRecipeDetails(${recipe.id})">View Recipe</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Function to populate detailed recipe view with tabbed content
function populateRecipeDetails(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        console.error('Recipe not found');
        return;
    }
    const container = document.getElementById('recipes-container');
    container.innerHTML = ''; // Clear previous content
    createTabs(['Ingredients', 'Instructions'], recipe, container);
}

// Function to create tabs for Ingredients and Instructions
function createTabs(tabNames, recipe, container) {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';

    tabNames.forEach((tabName, index) => {
        const tabButton = document.createElement('button');
        tabButton.textContent = tabName;
        tabButton.className = 'tab-button';
        tabButton.onclick = () => setActiveTab(index, tabNames.length);

        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = `${tabName.toLowerCase()}-content`;

        if (tabName === 'Ingredients') {
            const ingredientsList = document.createElement('ul');
            recipe.ingredients.forEach(ingredient => {
                const listItem = document.createElement('li');
                listItem.textContent = `${ingredient.quantity} of ${ingredient.ingredient_name}`;
                ingredientsList.appendChild(listItem);
            });
            tabContent.appendChild(ingredientsList);
        } else if (tabName === 'Instructions') {
            const instructionsList = document.createElement('ol');
            recipe.instructions.forEach(instruction => {
                const listItem = document.createElement('li');
                listItem.textContent = instruction;
                instructionsList.appendChild(listItem);
            });
            tabContent.appendChild(instructionsList);
        }

        tabsContainer.appendChild(tabButton);
        contentContainer.appendChild(tabContent);

        // Initially set the first tab as active
        if (index === 0) {
            tabButton.classList.add('active');
            tabContent.style.display = 'block';
        } else {
            tabContent.style.display = 'none';
        }
    });

    container.appendChild(tabsContainer);
    container.appendChild(contentContainer);
}

// Helper function to switch between tabs
function setActiveTab(activeIndex, totalTabs) {
    for (let i = 0; i < totalTabs; i++) {
        const tabButton = document.getElementsByClassName('tab-button')[i];
        const tabContent = document.getElementsByClassName('tab-content')[i];
        if (i === activeIndex) {
            tabButton.classList.add('active');
            tabContent.style.display = 'block';
        } else {
            tabButton.classList.remove('active');
            tabContent.style.display = 'none';
        }
    }
}

// Initial fetch and populate on document load
document.addEventListener('DOMContentLoaded', async () => {
    const recipes = await fetchRecipes();
    if (recipes) {
        populateRecipeCards(recipes);
    }
});
