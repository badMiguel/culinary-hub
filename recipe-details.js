// This function initializes the fetch operation for the recipe data
document.addEventListener('DOMContentLoaded', function() {
    fetch('recipe_data.json')
        .then(response => response.json())  // Parses the JSON response
        .then(data => {
            loadRecipes(data);  // Loads the recipes into the web page
        })
        .catch(error => console.error('Error fetching recipes:', error));  // Handles any errors
});

// This function processes the recipe data and creates cards for each recipe
function loadRecipes(recipesData) {
    const container = document.getElementById('recipes-container');
    recipesData.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image-container">
                <img src="${recipe.recipe_image}" alt="${recipe.recipe_title}">
            </div>
            <div class="caption-container">
                <div class="image_title">${recipe.recipe_title}</div>
                <p>${recipe.recipe_description}</p>
            </div>
        `;
        
        container.appendChild(card);
    });
}


