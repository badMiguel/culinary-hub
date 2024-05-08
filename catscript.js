// Get reference to the recipes container
const recipesContainer = document.getElementById('recipes');

// Get reference to the filters container
const filtersContainer = document.getElementById('filters');

// Function to filter recipes based on allergen checkboxes
function filterRecipes() {
    recipesContainer.innerHTML = ''; // Clear previous recipes

    recipes.forEach(recipe => {
        let displayRecipeFlag = true; // Flag to determine whether to display the recipe

        allergens.forEach(allergen => {
            const allergenCheckbox = document.getElementById(allergen);
            if (allergenCheckbox.checked && recipe.allergens.includes(allergen)) {
                displayRecipeFlag = false; // If the recipe contains the allergen and the checkbox is checked, do not display the recipe
            }
        });

        if (displayRecipeFlag) {
            displayRecipe(recipe);
        }
    });
}

// Function to display a recipe
function displayRecipe(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    // HTML structure for the recipe display
    const html = `
        <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
        <h2>${recipe.recipe_title}</h2>
        <p>${recipe.recipe_description}</p>
        <!-- Add more recipe details here -->
    `;

    recipeElement.innerHTML = html;
    recipesContainer.appendChild(recipeElement);
}

// Function to fetch recipe data and add filter checkboxes
function fetchRecipeDataAndAddCheckboxes() {
    fetch('recipe_data.json')
        .then(response => response.json())
        .then(data => {
            recipes = data;

            // Get unique allergens from the recipes
            allergens = [...new Set(recipes.flatMap(recipe => recipe.allergens))];

            // Generate filter checkboxes
            generateFilterCheckboxes();

            // Display all recipes by default
            recipes.forEach(recipe => displayRecipe(recipe));
        })
        .catch(error => console.error('Error fetching recipe data:', error));
}

// Function to generate filter checkboxes
function generateFilterCheckboxes() {
    allergens.forEach(allergen => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = allergen;
        checkbox.addEventListener('change', filterRecipes);
        
        const label = document.createElement('label');
        label.htmlFor = allergen;
        label.textContent = allergen;
        
        filtersContainer.appendChild(checkbox);
        filtersContainer.appendChild(label);
        filtersContainer.appendChild(document.createElement('br'));
    });
}

// Fetch recipe data and add filter checkboxes
fetchRecipeDataAndAddCheckboxes();
