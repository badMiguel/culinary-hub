// Function to create and append recipe cards
function loadRecipes(recipesData) {
    const container = document.getElementById('recipes-container');
    recipesData.forEach(recipe => {
        const cardHtml = `
            <div class="card">
                <div class="image-container">
                    <a href="${recipe.recipe_link}" aria-label="View More information about this recipe">
                        <picture>
                            <source media="(min-width: 582px)" srcset="${recipe.recipe_image}">
                            <source media="(max-width: 581px)" srcset="${recipe.recipe_image}">
                            <img class="image-styles" src="${recipe.recipe_image}" draggable="false" alt="${recipe.recipe_title}">
                        </picture>
                    </a>
                </div>
                <div class="caption-container">
                    <div class="image_title">
                        <a href="${recipe.recipe_link}">${recipe.recipe_title}</a>
                    </div>
                    <p>${recipe.recipe_description}</p>
                    <p><strong>Prep Time:</strong> <span>${recipe.prep_time}</span></p>
                    <p><strong>Allergens:</strong> <span>${recipe.allergens.join(', ')}</span></p>
                    <p><strong>Cooking Skill Level:</strong> <span>${recipe.cooking_skill_level}</span></p>
                    <ul><strong>Ingredients:</strong>${recipe.ingredients.map(i => `<li>${i.ingredient_name}: ${i.quantity}</li>`).join('')}</ul>
                    <ol><strong>Instructions:</strong>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
                    <ul><strong>Nutrition Facts:</strong>${Object.entries(recipe.nutrition_facts).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}</ul>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

// Function to fetch recipes from the local JSON file
function fetchRecipes() {
    fetch('recipe_data.json')
        .then(response => response.json())  // Parse the JSON from the response
        .then(data => loadRecipes(data))    // Pass the data to loadRecipes
        .catch(error => console.error('Error fetching recipes:', error));
}

// Call the fetchRecipes function on window load
window.onload = fetchRecipes;
