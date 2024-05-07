// Async function to fetch recipe data from JSON
async function fetchRecipes() {
    document.getElementById('loading-indicator').style.display = 'block';
    try {
        const response = await fetch('recipe_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;  // Ensure null is returned to handle this gracefully
    } finally {
        document.getElementById('loading-indicator').style.display = 'none';
    }
}

// Function to populate recipe cards dynamically
function populateRecipeCards(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    recipes.forEach(recipe => {
        container.appendChild(createRecipeCard(recipe));
    });
}

// Function to create a single recipe card element
function createRecipeCard(recipe) {
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
    return card;
}

// Function to populate detailed recipe view with tabbed content
async function populateRecipeDetails(recipeId) {
    const recipes = await fetchRecipes(); // Fetch or pass as an argument
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) {
        console.error('Recipe not found');
        return;
    }
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    createTabs(['Ingredients', 'Instructions'], recipe, container);
}

// Function to create tabs for Ingredients and Instructions
function createTabs(tabNames, recipe, container) {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';

    tabNames.forEach((tabName, index) => {
        const {tabButton, tabContent} = createTab(tabName, recipe);
        tabsContainer.appendChild(tabButton);
        contentContainer.appendChild(tabContent);
        setTabVisibility(tabButton, tabContent, index === 0);
    });

    container.appendChild(tabsContainer);
    container.appendChild(contentContainer);
}

// Helper function to create individual tabs and contents
function createTab(tabName, recipe) {
    const tabButton = document.createElement('button');
    tabButton.textContent = tabName;
    tabButton.className = 'tab-button';
    tabButton.onclick = () => setActiveTab(index, tabNames.length);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    tabContent.id = `${tabName.toLowerCase()}-content`;

    tabContent.appendChild(createTabContent(tabName, recipe));

    return {tabButton, tabContent};
}

// Function to populate tab content based on tab name
function createTabContent(tabName, recipe) {
    const contentList = document.createElement(tabName === 'Instructions' ? 'ol' : 'ul');
    recipe[tabName.toLowerCase()].forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = tabName === 'Instructions' ? item : `${item.quantity} of ${item.ingredient_name}`;
        contentList.appendChild(listItem);
    });
    return contentList;
}

// Helper function to switch between tabs
function setActiveTab(activeIndex, totalTabs) {
    for (let i = 0; i < totalTabs; i++) {
        const tabButton = document.getElementsByClassName('tab-button')[i];
        const tabContent = document.getElementsByClassName('tab-content')[i];
        setTabVisibility(tabButton, tabContent, i === activeIndex);
    }
}

// Helper function to set tab visibility
function setTabVisibility(tabButton, tabContent, isActive) {
    if (isActive) {
        tabButton.classList.add('active');
        tabContent.style.display = 'block';
    } else {
        tabButton.classList.remove('active');
        tabContent.style.display = 'none';
    }
}

// Initial fetch and populate on document load
document.addEventListener('DOMContentLoaded', async () => {
    const recipes = await fetchRecipes();
    if (recipes) {
        populateRecipeCards(recipes);
    }
});
